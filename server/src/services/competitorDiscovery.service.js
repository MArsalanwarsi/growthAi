import aiService from './ai/ai.service.js';

export const discoverCompetitors = async (businessDetails) => {
  return await aiService.analyzeCompetitors(businessDetails);
};

export default { discoverCompetitors };
