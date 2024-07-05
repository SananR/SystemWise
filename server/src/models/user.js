import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  auth: {
    type: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: function () {
        return this.auth.type === 'regular';
      },
    },
    provider: {
      type: String,
      required: function () {
        return this.auth.type === 'oauth';
      },
    },
  },
});

export const User = mongoose.model('User', UserSchema);
