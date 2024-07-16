import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.ts';
import { usersRouter } from './routes/user_router.ts';
import { submissionsRouter } from './routes/submissions_router.ts';
import logger from 'morgan';
import 'dotenv/config';
import connectMongoDB from './middleware/mongoConnector.ts';
import cors from 'cors';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { connectRedis } from './middleware/redisConnector.ts';

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
  });
} catch (error) {
  console.error(error);
}

app.use(
  session({
    store: authStore,
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true when using HTTPS
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/submissions', submissionsRouter);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Backend server connected on http://localhost:${PORT}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json('error');
});

export default app;
