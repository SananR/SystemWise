import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.js';
import { usersRouter } from './routes/user_router.js';
import logger from 'morgan';
import 'dotenv/config';
import connectMongoDB from '../middleware/mongoConnector.js';
import cors from 'cors';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { connectRedis } from '../middleware/redisConnector.js';

const PORT = 3000;
const app = express();
let authStore;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

try {
  await connectMongoDB(); // Connect to MongoDB
  let redisClient = await connectRedis(); // Connect to Redis

  // Initialize auth Redis store
  authStore = new RedisStore({
    client: redisClient,
    prefix: 'auth:',
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
  });
} catch (error) {
  console.error(error);
}

app.use(
  session({
    store: authStore,
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Backend server connected on http://localhost:${PORT}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json('error');
});

export default app;
