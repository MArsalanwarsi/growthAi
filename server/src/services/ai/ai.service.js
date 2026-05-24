import { askGemini } from './gemini.provider.js';
import { promptTemplates } from './promptTemplates.js';
import { logger } from '../../utils/logger.js';
import { redisCache } from '../../config/redis.js';

export const analyzeCompetitors = async (businessDetails) => {
  const cacheKey = `comp_discover_${businessDetails.name.toLowerCase().replace(/\s+/g, '_')}`;
  const cached = await redisCache.get(cacheKey);
  if (cached) {
    logger.info(`Serving cached competitor discovery for ${businessDetails.name}`);
    return JSON.parse(cached);
  }

  const prompt = promptTemplates.competitorDiscovery(businessDetails);

  const result = await askGemini(prompt, 'You are an elite competitive intelligence database.');
  
  // Cache the result for 1 hour (3600 seconds)
  await redisCache.set(cacheKey, JSON.stringify(result), 3600);
  
  return result;
};

export const getRecommendations = async (businessDetails, competitorsList = ['Vortex Brands']) => {
  const cacheKey = `recs_${businessDetails.name.toLowerCase().replace(/\s+/g, '_')}`;
  const cached = await redisCache.get(cacheKey);
  if (cached) {
    logger.info(`Serving cached recommendations for ${businessDetails.name}`);
    return JSON.parse(cached);
  }

  const prompt = promptTemplates.recommendations(businessDetails, competitorsList);

  const result = await askGemini(prompt, 'You are a principal growth engineering director.');
  
  await redisCache.set(cacheKey, JSON.stringify(result), 3600);
  return result;
};

export const runBattleMode = async (competitorName, businessDetails) => {
  const prompt = promptTemplates.battleMode(competitorName, businessDetails);
  const result = await askGemini(prompt, 'You are an elite head-to-head battle strategy advisor.');
  return result;
};

export const analyzeSentiment = async (competitorName) => {
  const prompt = promptTemplates.sentimentAnalysis(competitorName);
  const result = await askGemini(prompt, 'You are an expert consumer psychologist.');
  return result;
};

export default {
  analyzeCompetitors,
  getRecommendations,
  runBattleMode,
  analyzeSentiment
};
