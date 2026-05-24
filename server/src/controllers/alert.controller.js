import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AlertModel } from '../models/alert.model.js';

export const getAlerts = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let alerts = await AlertModel.find({ userId }).sort({ createdAt: -1 });

  if (alerts.length === 0) {
    // Seed initial alerts if empty for demo
    alerts = [
      new AlertModel({
        userId,
        type: 'warning',
        title: 'Competitor ad activity scaling',
        message: 'Vortex Brands launched 8 new lookalike ads Targeting cart abandoners.',
        read: false
      }),
      new AlertModel({
        userId,
        type: 'success',
        title: 'Viral video benchmark breached',
        message: 'Lumina Labs UGC product review Reel passed 50K views in 2 hours.',
        read: false
      }),
      new AlertModel({
        userId,
        type: 'info',
        title: 'Competitor changed landing page pricing',
        message: 'Nova Commerce changed Starter to include standard team seats.',
        read: true
      })
    ];
    await AlertModel.insertMany(alerts);
    alerts = await AlertModel.find({ userId }).sort({ createdAt: -1 });
  }

  return res.status(200).json(
    new ApiResponse(200, alerts, 'Recent intelligence alert streams fetched')
  );
});

export const markAsRead = asyncHandler(async (req, res) => {
  const alert = await AlertModel.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { $set: { read: true } },
    { new: true }
  );

  return res.status(200).json(
    new ApiResponse(200, alert, 'Alert marked as read')
  );
});
