import {
  Submission,
  SubmissionJobType,
  SubmissionStatus,
} from '../models/submission.ts';
import { User } from '../models/user.ts';
import { Router } from 'express';
import 'dotenv/config';
import { isAuthenticated } from '../middleware/auth.ts';
import { body, query, validationResult } from 'express-validator';
import { redisClient } from '../middleware/redisConnector.ts';
import { Queue } from 'bullmq';

export const submissionsRouter = Router();

const submissionQueue = new Queue('SubmissionQueue', {
  connection: redisClient,
});

submissionsRouter.get(
  '/',
  isAuthenticated,
  query('submission_id').notEmpty().isMongoId().escape(),
  async (req, res) => {
    const result = validationResult(req).array();
    if (result.length != 0) {
      res.status(400).json({ error: 'Bad Request' });
      return;
    }
    const submission = await Submission.findById(req.query.submission_id);
    if (!submission) {
      res
        .status(404)
        .json({ error: 'Could not find submission with provided id.' });
      return;
    }
    return res.status(200).json({
      submission_id: submission._id,
      score: submission.score,
      feedback: 'TODO',
    });
  }
);

submissionsRouter.post(
  '/check',
  isAuthenticated,
  query('submission_id').notEmpty().isMongoId().escape(),
  async (req, res) => {
    const result = validationResult(req).array();
    if (result.length != 0) {
      res.status(400).json({ error: 'Bad Request' });
      return;
    }
    const submission = await Submission.findById(req.query.submission_id);
    if (!submission) {
      res
        .status(404)
        .json({ error: 'Could not find submission with provided id.' });
      return;
    }
    if (
      SubmissionStatus[submission.status] == SubmissionStatus.AWAITING_GRADING
    ) {
      res.status(200).json({ submission_status: submission.status });
    } else if (SubmissionStatus[submission.status] == SubmissionStatus.GRADED) {
      res.status(200).json({
        submission_id: submission._id,
        submission_status: submission.status,
        score: submission.score,
      });
    }
  }
);

submissionsRouter.post(
  '/',
  isAuthenticated,
  query('problem').notEmpty().escape(),
  body('content').notEmpty().trim(),
  async (req, res) => {
    const result = validationResult(req).array();
    if (result.length != 0) {
      res.status(400).json({ error: 'Bad Request' });
      return;
    }
    //TODO VALIDATE PROBLEM

    const user = await User.findOne({ username: req.session.userId });
    const submission = await Submission.create({
      user: user,
      problem: req.query.problem,
      content: req.body.content,
    });

    // Add the submission to the task queue
    await submissionQueue.add(
      SubmissionJobType.GRADE_SUBMISSION,
      { submission },
      {
        removeOnComplete: 1000,
        removeOnFail: 5000,
      }
    );

    return res.status(201).json({ submission_id: submission._id });
  }
);
