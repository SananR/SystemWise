import mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return this.type === 'regular';
    },
  },
  provider: {
    type: String,
    required: function () {
      return this.type === 'oauth';
    },
  },
});

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
    required: true,
    type: AuthSchema,
  },
});

export const User = mongoose.model('User', UserSchema);
