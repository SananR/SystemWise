import { User } from '../models/user.js';
import { Router } from 'express';
import bcrypt from 'bcrypt';

export const usersRouter = Router();

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
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
    username: req.body.username,
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
