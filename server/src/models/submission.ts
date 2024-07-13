import mongoose from 'mongoose';

export enum SubmissionStatus {
  AWAITING_GRADING,
  GRADED,
}

const SubmissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    //required: true,
  },
  problem: {
    type: mongoose.Types.ObjectId,
    ref: 'Problem',
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
});

export const Submission = mongoose.model('Submission', SubmissionSchema);
