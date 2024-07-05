import { User } from '../models/user.js';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import 'dotenv/config';
import crypto from 'crypto';

export const usersRouter = Router();

const client = new OAuth2Client();
usersRouter.post('/signup', async (req, res) => {
  if (
    !req.body ||
    !req.body.password ||
    !req.body.email ||
    !req.body.username
  ) {
    res.status(400).json({ error: 'Bad Request' });
    return;
  }
  const existingUserEmail = await User.findOne({
    email: req.body.email,
  });

  const existingUserName = await User.findOne({
    username: req.body.username,
  });

  if (existingUserName || existingUserEmail) {
    return res.status(422).json({ error: 'Invalid credentials' });
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const auth = {
    type: 'regular',
    password: bcrypt.hashSync(req.body.password, salt),
  };

  const user = new User({
    email: req.body.email,
    username: req.body.username,
    auth: auth,
  });

  try {
    const jsonResponse = await user.save();
    req.session.userId = jsonResponse.username;
    const response = {
      username: jsonResponse.username,
      email: jsonResponse.email,
    };
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ error: 'User creation failed.' });
  }
});

usersRouter.post('/login', async (req, res) => {
  if (!req.body.password) {
    res.status(400).json({ error: 'Password Required' });
    return;
  }
  if (!req.body.email) {
    res.status(400).json({ error: 'Email Required' });
    return;
  }
  const user = await User.findOne({ email: req.body.email });
  if (user === null) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  const password = bcrypt.compareSync(req.body.password, user.password);
  if (!password) {
    res.status(400).json({ error: 'Password Incorrect' });
    return;
  }
  req.session.user_email = user.email;
  return res.status(200).json({ username: user.username, email: user.email });
});

usersRouter.get('/me', async (req, res) => {
  if (!req.session.userId) {
    return res.status(400).json({ error: 'Bad request' });
  }
  const user = await User.findOne({ username: req.session.userId });
  if (!user) {
    return res.status(400).json({ error: 'Bad request' });
  }
  const response = { username: user.username };
  return res.json(response);
});

usersRouter.post('/signup/google', async (req, res) => {
  if (!req.body || !req.body.idToken || !req.body.email || !req.body.name) {
    return res.status(400).json({ error: 'Bad request' });
  }
  const idToken = req.body.idToken;

  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) {
    return res.status(422).json({ error: 'Unprocessable entity' });
  }

  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const hash = crypto.createHash('md5').update(payload.sub).digest('hex');
  var k = 5;
  var username = payload.given_name + payload.family_name + hash.slice(0, k);
  var user;

  while (k < hash.length) {
    user = await User.findOne({ username: username });
    if (!user) {
      const newUser = new User({
        username: username,
        email: payload.email,
        auth: {
          type: 'oauth',
          provider: 'GOOGLE',
        },
      });
      const result = await newUser.save();
      req.session.userId = result.username;
      return res
        .status(200)
        .json({ username: result.username, email: result.email });
    }
    k += 1;
    username = payload.given_name + payload.family_name + hash.slice(0, k);
  }

  return res.status(422).json({ error: 'Unprocessable entity' });
});
