import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: 'Competitor Intelligence Brief' },
  type: { type: String, default: 'Full Intelligence' },
  status: { type: String, default: 'Complete' },
  summary: { type: String, default: '' },
  data: { type: mongoose.Schema.Types.Mixed, default: {} }
}, {
  timestamps: true
});

export const ReportModel = mongoose.model('Report', reportSchema);
export default ReportModel;
