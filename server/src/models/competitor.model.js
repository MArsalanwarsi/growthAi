import mongoose from 'mongoose';

const competitorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  logo: { type: String, default: '' },
  score: { type: Number, default: 50 },
  strength: { type: String, default: 'Moderate' },
  platformPresence: { type: [String], default: [] },
  followers: { type: String, default: '0' },
  engagementRate: { type: String, default: '0%' },
  postingFrequency: { type: String, default: '0 posts/week' },
  adActivity: { type: String, default: 'Inactive' },
  seoTraffic: { type: String, default: '0/mo' },
  pricingInsight: { type: String, default: 'N/A' },
  sentimentScore: { type: String, default: 'Neutral' },
  whyStrong: { type: String, default: '' }
}, {
  timestamps: true
});

export const CompetitorModel = mongoose.model('Competitor', competitorSchema);
export default CompetitorModel;
