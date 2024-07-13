import { User } from '../models/user.ts';
import { Submission } from '../models/submission.ts';
import { Router } from 'express';
import 'dotenv/config';
import { isAuthenticated } from '../middleware/auth.ts';
import { body, query, Result, validationResult } from 'express-validator';
import { connectRedis } from '../middleware/redisConnector.ts';
import { Queue } from 'bullmq';

export const submissionsRouter = Router();

const redisClient = await connectRedis(); // Connect to Redis
const submissionQueue = new Queue('SubmissionQueue', {
  connection: redisClient,
});

submissionsRouter.post(
  '/',
  //isAuthenticated,
  query('problem').notEmpty().escape(),
  body('content').notEmpty().trim(),
  async (req, res) => {
    const result = validationResult(req).array();
    if (result.length != 0) {
      res.status(400).json({ error: 'Bad Request' });
      return;
    }
    //TODO VALIDATE PROBLEM

    //const user = await User.findOne({ username: req.session.userId });
    const submission = await Submission.create({
      //user: user,
      problem: req.query.problem,
      content: req.body.content,
    });

    // Add the submission to the task queue
    await submissionQueue.add(
      'submission',
      { test: 'test', submission },
      {
        removeOnComplete: 1000,
        removeOnFail: 5000,
      }
    );

    return res.status(201).json(submission);
  }
);

submissionsRouter.get('/:id/status', isAuthenticated, async (req, res) => {});
