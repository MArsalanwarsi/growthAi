import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { UserModel } from '../models/user.model.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, company, tier } = req.body;

  const existing = await UserModel.findOne({ email });
  if (existing) {
    throw new ApiError(400, 'User already exists with this email address');
  }

  const user = new UserModel({
    name,
    email,
    password,
    company: company || 'GrowthRadar Workspace',
    tier: tier || 'Free'
  });
  await user.save();

  // Create clean user object for return
  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    company: user.company,
    role: user.role,
    tier: user.tier
  };

  const token = jwt.sign({ id: user._id, email: user.email }, env.jwtSecret, { expiresIn: env.jwtExpiry });

  return res.status(201).json(
    new ApiResponse(201, { user: userResponse, token }, 'User registered successfully')
  );
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid credentials: user not found');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials: password incorrect');
  }

  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    company: user.company,
    role: user.role,
    tier: user.tier
  };

  const token = jwt.sign({ id: user._id, email: user.email }, env.jwtSecret, { expiresIn: env.jwtExpiry });

  return res.status(200).json(
    new ApiResponse(200, { user: userResponse, token }, 'Login successful')
  );
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user.id).select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found in system');
  }
  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    company: user.company,
    role: user.role,
    tier: user.tier
  };
  return res.status(200).json(
    new ApiResponse(200, userResponse, 'Current user profile fetched successfully')
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { tier, name, company } = req.body;
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (tier) user.tier = tier;
  if (name) user.name = name;
  if (company) user.company = company;

  await user.save();

  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    company: user.company,
    role: user.role,
    tier: user.tier
  };

  return res.status(200).json(
    new ApiResponse(200, userResponse, 'User profile updated successfully')
  );
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  const resetToken = user
    ? jwt.sign({ id: user._id, email: user.email, purpose: 'password-reset' }, env.jwtSecret, { expiresIn: '15m' })
    : null;

  return res.status(200).json(
    new ApiResponse(200, { resetToken }, 'If an account exists, a reset link has been prepared.')
  );
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  try {
    const decodedToken = jwt.verify(token, env.jwtSecret);

    if (decodedToken.purpose !== 'password-reset') {
      throw new ApiError(400, 'Invalid reset token purpose');
    }

    const user = await UserModel.findById(decodedToken.id);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    user.password = password;
    await user.save();

    return res.status(200).json(
      new ApiResponse(200, null, 'Password updated successfully')
    );
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(400, 'Invalid or expired reset token');
  }
});
