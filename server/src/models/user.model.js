import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  company: { type: String, default: 'GrowthRadar Workspace' },
  role: { type: String, default: 'Owner' },
  tier: { type: String, default: 'Free', enum: ['Free', 'Starter', 'Pro', 'Business'] }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Static helper to align with the legacy codebase interface
userSchema.statics.findByEmail = async function(email) {
  return this.findOne({ email });
};

export const UserModel = mongoose.model('User', userSchema);
export default UserModel;
