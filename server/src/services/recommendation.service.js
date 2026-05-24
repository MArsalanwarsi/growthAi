import aiService from './ai/ai.service.js';

export const generateRecommendations = async (businessDetails) => {
  return await aiService.getRecommendations(businessDetails);
};

export default { generateRecommendations };
