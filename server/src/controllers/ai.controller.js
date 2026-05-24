import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import aiService from '../services/ai/ai.service.js';
import { askGemini } from '../services/ai/gemini.provider.js';
import { BusinessModel } from '../models/business.model.js';
import { CompetitorModel } from '../models/competitor.model.js';

const normalizeGeneratedCopy = (data, { channel, topic, tone }) => {
  if (data?.body) {
    return {
      success: true,
      hook: data.hook || `Win the ${channel || 'growth'} moment your competitors are missing.`,
      body: data.body,
      cta: data.cta || 'Launch the campaign now.'
    };
  }

  return {
    success: true,
    hook: `Turn ${topic || 'your competitor gap'} into a campaign buyers remember.`,
    body: data?.analysis || data?.reasoning || `Create ${tone || 'professional'} ${channel || 'marketing'} copy that leads with the customer pain point, proves why your offer removes friction faster, and closes with a direct action.`,
    cta: 'Publish the competitor-gap message this week.'
  };
};

export const analyze = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  let businessDetails = req.body;
  if (userId) {
    const business = await BusinessModel.findOne({ userId });
    if (business) {
      businessDetails = business;
    }
  }

  const data = await aiService.analyzeCompetitors(businessDetails);
  return res.status(200).json(
    new ApiResponse(200, data, 'Competitor discovery benchmark AI analysis complete')
  );
});

export const recommendations = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  let businessDetails = req.body;
  if (userId) {
    const business = await BusinessModel.findOne({ userId });
    if (business) {
      businessDetails = business;
    }
  }

  let competitorsList = ['Vortex Brands'];
  if (userId) {
    const comps = await CompetitorModel.find({ userId });
    if (comps.length > 0) {
      competitorsList = comps.map(c => c.name);
    }
  }

  const data = await aiService.getRecommendations(businessDetails, competitorsList);
  return res.status(200).json(
    new ApiResponse(200, data, 'Growth suggestions generated successfully')
  );
});

export const content = asyncHandler(async (req, res) => {
  const { channel, topic, tone } = req.body;
  
  // Custom copywriting prompt
  const prompt = `Write high-converting, premium marketing copy for a B2B SaaS platform on ${channel}. Topic is: ${topic}. Tone should be: ${tone}. Include a viral hook, 3 bullet points showing why it outperforms competitors, and an actionable Call to Action. Return ONLY a valid JSON object containing fields: hook, body, and cta.`;
  const data = normalizeGeneratedCopy(
    await askGemini(prompt, 'You are an elite B2B copywriter.'),
    { channel, topic, tone }
  );

  return res.status(200).json(
    new ApiResponse(200, data, 'AI Marketing Copy successfully written')
  );
});

export const battleMode = asyncHandler(async (req, res) => {
  const { competitorName } = req.body;
  const userId = req.user?.id;
  let businessDetails = req.body.businessDetails;
  
  if (userId) {
    const business = await BusinessModel.findOne({ userId });
    if (business) {
      businessDetails = business;
    }
  }

  const data = await aiService.runBattleMode(competitorName, businessDetails);
  return res.status(200).json(
    new ApiResponse(200, data, 'Head-to-Head gap comparison matrix complete')
  );
});

export const report = asyncHandler(async (req, res) => {
  const { competitorName } = req.body;
  const data = await aiService.analyzeSentiment(competitorName);
  return res.status(200).json(
    new ApiResponse(200, data, 'Sentiment and marketing angle exploitation brief generated')
  );
});
