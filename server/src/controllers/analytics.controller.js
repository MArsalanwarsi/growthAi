import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getDashboardOverview = asyncHandler(async (req, res) => {
  const dashboardData = {
    metrics: [
      { label: 'Growth Score', value: '84', change: '+4.2% versus category average', status: 'positive' },
      { label: 'Tracked Competitors', value: '5', change: '2 aggressive, 3 testing', status: 'neutral' },
      { label: 'Market Opportunity Index', value: '92', change: '3 new high-priority content gaps', status: 'positive' },
      { label: 'Active Competitor Ads', value: '52', change: '+14% spend surge detected', status: 'warning' }
    ],
    monthlyGrowth: [
      { month: 'Jan', you: 45, market: 42, leader: 68 },
      { month: 'Feb', you: 52, market: 44, leader: 70 },
      { month: 'Mar', you: 58, market: 46, leader: 74 },
      { month: 'Apr', you: 68, market: 49, leader: 81 },
      { month: 'May', you: 84, market: 52, leader: 91 }
    ],
    seoSnapshot: [
      { aspect: 'Keywords', value: 85 },
      { aspect: 'Backlinks', value: 65 },
      { aspect: 'Site Speed', value: 92 },
      { aspect: 'Domain Rating', value: 74 },
      { aspect: 'Content Count', value: 80 }
    ],
    adsSnapshot: [
      { channel: 'Meta (FB/IG)', spend: 85, conversions: 92 },
      { channel: 'TikTok Ads', spend: 65, conversions: 78 },
      { channel: 'Google Display', spend: 40, conversions: 45 },
      { channel: 'YouTube Video', spend: 30, conversions: 35 }
    ]
  };

  return res.status(200).json(
    new ApiResponse(200, dashboardData, 'Dashboard overview data fetched')
  );
});

export const getGrowthScore = asyncHandler(async (req, res) => {
  const data = {
    overall: 84,
    components: {
      socialScore: 81,
      seoScore: 78,
      conversionScore: 92,
      adsScore: 85,
      brandScore: 82,
      productScore: 86
    },
    weakness: 'SEO Backlinks volume and Instagram daily posting frequency.',
    steps: [
      'Increase Instagram video publishing to at least 1.5 posts daily.',
      'Deploy 3 new comparison sheets capturing competitor search keyword overlaps.'
    ]
  };
  return res.status(200).json(new ApiResponse(200, data, 'Growth score metrics loaded'));
});

export const getOpportunities = asyncHandler(async (req, res) => {
  const list = [
    { type: 'Niche Gaps', title: 'DTC Packaging Tutorials', score: '92% Demand' },
    { type: 'Pricing Whitespace', title: 'Pro-tier White Label Reports', score: '88% Conversion' },
    { type: 'Content Gap', title: 'Alternative to Vortex Brands review', score: '95% Volatility' }
  ];
  return res.status(200).json(new ApiResponse(200, list, 'Market opportunities identified'));
});

export const getPredictions = asyncHandler(async (req, res) => {
  const predictions = [
    { target: 'Vortex Brands ad budget scaling', probability: '85%', timeline: '14 days' },
    { target: 'Short-form UGC video click-through lift', probability: '92%', timeline: 'Ongoing' }
  ];
  return res.status(200).json(new ApiResponse(200, predictions, 'Predictive growth signals loaded'));
});
