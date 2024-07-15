import mongoose from 'mongoose';

export enum SubmissionJobType {
  GRADE_SUBMISSION = 'GRADE_SUBMISSION',
  UPDATE_SUBMISSION = 'UPDATE_SUBMISSION',
}

export enum SubmissionStatus {
  AWAITING_GRADING = 'AWAITING_GRADING',
  GRADED = 'GRADED',
}

const SubmissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  problem: {
    type: String,
    //ref: 'Problem',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: SubmissionStatus,
    default: SubmissionStatus.AWAITING_GRADING,
  },
  score: {
    type: Number,
  },
});

export const Submission = mongoose.model('Submission', SubmissionSchema);
