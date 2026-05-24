import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { CompetitorModel } from '../models/competitor.model.js';
import { BusinessModel } from '../models/business.model.js';
import competitorDiscoveryService from '../services/competitorDiscovery.service.js';
import socialAnalyticsService from '../services/socialAnalytics.service.js';
import seoService from '../services/seo.service.js';
import adsService from '../services/ads.service.js';
import sentimentService from '../services/sentiment.service.js';

export const discover = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  
  // Find current business settings
  const business = await BusinessModel.findOne({ userId });
  const calibration = business || req.body;

  const competitorAnalysis = await competitorDiscoveryService.discoverCompetitors(calibration);
  
  if (competitorAnalysis && competitorAnalysis.competitors) {
    // Delete previous competitors to replace with newly scanned ones
    await CompetitorModel.deleteMany({ userId });

    // Save each competitor
    const competitorsToSave = competitorAnalysis.competitors.map(comp => ({
      userId,
      name: comp.name,
      logo: comp.logo || comp.name.slice(0,2).toUpperCase(),
      score: comp.score || 50,
      strength: comp.strength || 'Moderate',
      platformPresence: comp.platformPresence || [],
      followers: comp.followers || '0',
      engagementRate: comp.engagementRate || '0%',
      postingFrequency: comp.postingFrequency || '0 posts/week',
      adActivity: comp.adActivity || 'Inactive',
      seoTraffic: comp.seoTraffic || '0/mo',
      pricingInsight: comp.pricingInsight || 'N/A',
      sentimentScore: comp.sentimentScore || 'Neutral',
      whyStrong: comp.whyStrong || ''
    }));

    await CompetitorModel.insertMany(competitorsToSave);
  }

  return res.status(200).json(
    new ApiResponse(200, competitorAnalysis, 'Competitors discovered successfully and saved to database')
  );
});

export const getCompetitorsList = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let list = await CompetitorModel.find({ userId });
  
  if (list.length === 0) {
    // Return standard initial list if nothing is stored yet (useful for pristine demo experience)
    list = [
      {
        name: "Vortex Brands",
        logo: "VB",
        score: 91,
        strength: "Aggressive",
        platformPresence: ["Instagram", "TikTok", "YouTube"],
        followers: "240K",
        engagementRate: "4.8%",
        postingFrequency: "2.4 posts/day",
        adActivity: "Scaling",
        seoTraffic: "85K/mo",
        pricingInsight: "Premium Pricing",
        sentimentScore: "Highly Positive",
        whyStrong: "High frequency video cadence and top tier checkout conversion layout hooks."
      },
      {
        name: "Lumina Labs",
        logo: "LL",
        score: 84,
        strength: "Moderate",
        platformPresence: ["Instagram", "Facebook"],
        followers: "90K",
        engagementRate: "1.9%",
        postingFrequency: "3 posts/week",
        adActivity: "Testing",
        seoTraffic: "32K/mo",
        pricingInsight: "Discount Bundles",
        sentimentScore: "Mixed",
        whyStrong: "Leverages strong social proof review grids to convert middle-of-funnel users."
      }
    ].map(item => ({ ...item, userId }));
    
    await CompetitorModel.insertMany(list);
    list = await CompetitorModel.find({ userId });
  }
  
  return res.status(200).json(
    new ApiResponse(200, list, 'Competitor list retrieved successfully')
  );
});

export const getCompetitorDetails = asyncHandler(async (req, res) => {
  const competitor = await CompetitorModel.findOne({ _id: req.params.id, userId: req.user.id });
  if (!competitor) {
    throw new ApiError(404, 'Competitor not found');
  }

  const details = {
    id: competitor._id,
    name: competitor.name,
    logo: competitor.logo,
    score: competitor.score,
    websiteUrl: 'https://' + competitor.name.toLowerCase().replace(/\s+/g, '') + '.com',
    targetCountry: 'United States',
    strength: competitor.strength,
    pricingInsight: competitor.pricingInsight,
    social: await socialAnalyticsService.getSocialAnalytics(competitor.name),
    seo: await seoService.getSeoAnalytics(competitor.name),
    ads: await adsService.getAdsAnalytics(competitor.name),
    sentiment: await sentimentService.getSentimentIntelligence(competitor.name)
  };

  return res.status(200).json(
    new ApiResponse(200, details, 'Detailed competitor audit profile compiled')
  );
});

export const getCompetitorSocial = asyncHandler(async (req, res) => {
  const competitor = await CompetitorModel.findOne({ _id: req.params.id, userId: req.user.id });
  const name = competitor ? competitor.name : 'Vortex Brands';
  const data = await socialAnalyticsService.getSocialAnalytics(name);
  return res.status(200).json(new ApiResponse(200, data, 'Social analytics compiled'));
});

export const getCompetitorSeo = asyncHandler(async (req, res) => {
  const competitor = await CompetitorModel.findOne({ _id: req.params.id, userId: req.user.id });
  const name = competitor ? competitor.name : 'Vortex Brands';
  const data = await seoService.getSeoAnalytics(name);
  return res.status(200).json(new ApiResponse(200, data, 'SEO benchmarks compiled'));
});

export const getCompetitorAds = asyncHandler(async (req, res) => {
  const competitor = await CompetitorModel.findOne({ _id: req.params.id, userId: req.user.id });
  const name = competitor ? competitor.name : 'Vortex Brands';
  const data = await adsService.getAdsAnalytics(name);
  return res.status(200).json(new ApiResponse(200, data, 'Ads intelligence compiled'));
});

export const getCompetitorSentiment = asyncHandler(async (req, res) => {
  const competitor = await CompetitorModel.findOne({ _id: req.params.id, userId: req.user.id });
  const name = competitor ? competitor.name : 'Vortex Brands';
  const data = await sentimentService.getSentimentIntelligence(name);
  return res.status(200).json(new ApiResponse(200, data, 'Review sentiment intelligence compiled'));
});
