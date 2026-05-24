import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  industry: { type: String, required: true },
  websiteUrl: { type: String, required: true },
  instagramHandle: { type: String, default: '' },
  facebookPage: { type: String, default: '' },
  tiktokAccount: { type: String, default: '' },
  youtubeChannel: { type: String, default: '' },
  shopLinks: { type: [String], default: [] },
  appLinks: { type: [String], default: [] },
  targetCountry: { type: String, default: 'United States' },
  targetAudience: { type: String, default: '' },
  competitorKeywords: { type: [String], default: [] },
  budget: { type: String, default: '' },
  mainGrowthGoal: { type: String, default: 'Increase Engagement' }
}, {
  timestamps: true
});

export const BusinessModel = mongoose.model('Business', businessSchema);
export default BusinessModel;
