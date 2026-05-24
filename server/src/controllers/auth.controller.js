import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { UserModel } from '../models/user.model.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, tier } = req.body;

  const existing = await UserModel.findOne({ email });
  if (existing) {
    throw new ApiError(400, 'User already exists with this email address');
  }

  const user = new UserModel({
    name,
    email,
    password,
    tier: tier || 'Free'
  });
  await user.save();

  // Create clean user object for return
  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
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
    role: user.role,
    tier: user.tier
  };
  return res.status(200).json(
    new ApiResponse(200, userResponse, 'Current user profile fetched successfully')
  );
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { tier, name } = req.body;
  const user = await UserModel.findById(req.user.id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (tier) user.tier = tier;
  if (name) user.name = name;

  await user.save();

  const userResponse = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    tier: user.tier
  };

  return res.status(200).json(
    new ApiResponse(200, userResponse, 'User profile updated successfully')
  );
});
