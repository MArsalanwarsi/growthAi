import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ReportModel } from '../models/report.model.js';
import reportService from '../services/report.service.js';

export const createReport = asyncHandler(async (req, res) => {
  const { name, type } = req.body;
  const userId = req.user.id;

  const generatedData = await reportService.buildReport(name, type);

  const report = new ReportModel({
    userId,
    name: name || 'Competitor Intelligence Brief',
    type: type || 'Full Intelligence',
    status: 'Complete',
    summary: generatedData.summary || 'Compiled strategic insights.',
    data: generatedData
  });
  await report.save();

  return res.status(201).json(
    new ApiResponse(201, report, 'AI Intelligence Report compiled successfully')
  );
});

export const getReports = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let list = await ReportModel.find({ userId }).sort({ createdAt: -1 });

  if (list.length === 0) {
    // Seed initial reports if empty for demo
    list = [
      new ReportModel({
        userId,
        name: 'Q1 Competitor Benchmark',
        type: 'Full Intelligence',
        status: 'Complete',
        summary: 'Category leader Vortex Brands is scaling UGC video ads aggressively.',
        data: { opportunitiesFound: 4 }
      }),
      new ReportModel({
        userId,
        name: 'Vortex Ad Creative Audit',
        type: 'Ads Performance',
        status: 'Complete',
        summary: 'UGC video hooks created a 43% acquisition drop. Counter: deploy customer testimonial video grids.',
        data: { opportunitiesFound: 2 }
      })
    ];
    await ReportModel.insertMany(list);
    list = await ReportModel.find({ userId }).sort({ createdAt: -1 });
  }

  return res.status(200).json(
    new ApiResponse(200, list, 'All compiled intelligence reports loaded')
  );
});

export const getReportById = asyncHandler(async (req, res) => {
  const report = await ReportModel.findOne({ _id: req.params.id, userId: req.user.id });
  if (!report) {
    throw new ApiError(404, 'Report not found');
  }
  return res.status(200).json(new ApiResponse(200, report, 'Report fetched successfully'));
});
