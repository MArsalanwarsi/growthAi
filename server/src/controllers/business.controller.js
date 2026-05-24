import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { BusinessModel } from '../models/business.model.js';

export const createBusiness = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const calibrationData = { ...req.body, userId };

  // Perform an upsert: update if exists, otherwise create new
  const business = await BusinessModel.findOneAndUpdate(
    { userId },
    { $set: calibrationData },
    { new: true, upsert: true, runValidators: true }
  );

  return res.status(201).json(
    new ApiResponse(201, business, 'Business onboarding profile saved successfully')
  );
});

export const getBusiness = asyncHandler(async (req, res) => {
  // Scopes details specifically to the logged-in user
  let business = await BusinessModel.findOne({ userId: req.user.id });
  
  if (!business && req.params.id && req.params.id !== 'undefined') {
    business = await BusinessModel.findById(req.params.id);
  }

  return res.status(200).json(
    new ApiResponse(200, business, 'Business details fetched successfully')
  );
});

export const patchBusiness = asyncHandler(async (req, res) => {
  const business = await BusinessModel.findOneAndUpdate(
    { userId: req.user.id },
    { $set: req.body },
    { new: true, runValidators: true }
  );

  return res.status(200).json(
    new ApiResponse(200, business, 'Business profile updated successfully')
  );
});
