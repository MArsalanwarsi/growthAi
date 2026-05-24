import { askGemini } from './gemini.provider.js';
import { promptTemplates } from './promptTemplates.js';
import { logger } from '../../utils/logger.js';
import { redisCache } from '../../config/redis.js';

const defaultBusinessDetails = {
  name: 'GrowthRadar Workspace',
  industry: 'Ecommerce SaaS',
  websiteUrl: 'https://example.com',
  competitorKeywords: ['competitor intelligence', 'social analytics'],
  targetCountry: 'United States',
  targetAudience: 'Growth teams',
  budget: 'Standard',
  mainGrowthGoal: 'Increase qualified pipeline',
  instagramHandle: '',
  tiktokAccount: '',
  facebookPage: '',
  youtubeChannel: '',
  shopLinks: [],
  appLinks: []
};

const fallbackRecommendations = [
  {
    category: 'Content',
    title: 'Introduce a High-Hook Short Video Cadence',
    priority: 'High',
    difficulty: 'Medium',
    impact: 90,
    reason: 'Competitors with high daily video cadence generate stronger first-touch retention.',
    action: 'Repurpose proof points into short-form videos with a direct problem hook in the first 3 seconds.',
    outcome: 'Expect stronger profile traffic and retargeting audiences within 30 days.'
  },
  {
    category: 'Website',
    title: 'Streamline Mobile Checkout Interface',
    priority: 'High',
    difficulty: 'High',
    impact: 95,
    reason: 'Category leaders reduce drop-off with faster mobile paths and wallet-first checkout.',
    action: 'Move trust proof, pricing clarity, and express payment triggers closer to the primary CTA.',
    outcome: 'Expect a measurable lift in mobile conversion rate.'
  },
  {
    category: 'SEO',
    title: 'Target Long-Tail Informational Competitor Gaps',
    priority: 'Medium',
    difficulty: 'Low',
    impact: 75,
    reason: 'Comparison and pain-point keywords capture high-intent buyers before vendor selection.',
    action: 'Publish competitor-alternative pages around the problems your rivals leave unresolved.',
    outcome: 'Expect more qualified organic traffic with stronger conversion intent.'
  },
  {
    category: 'Ads',
    title: 'Test Social Proof Video Creative',
    priority: 'High',
    difficulty: 'Low',
    impact: 85,
    reason: 'Customer-proof creatives reduce uncertainty faster than generic feature ads.',
    action: 'Turn testimonials and review snippets into retargeting video and carousel assets.',
    outcome: 'Expect better click-through quality and lower acquisition waste.'
  }
];

const fallbackBattleMode = {
  success: true,
  overallWinner: 'Nova Commerce',
  gapAnalysis: 'Your brand trails in social cadence and mobile speed, but holds stronger pricing clarity and trust proof.',
  counterStrategy: 'Deploy proof-led short videos, clarify pricing advantages, and reduce mobile conversion friction.',
  comparison: {
    followers: { user: '85K', competitor: '190K', winner: 'competitor' },
    engagement: { user: '1.8%', competitor: '4.2%', winner: 'competitor' },
    postingFrequency: { user: '3/week', competitor: '2/day', winner: 'competitor' },
    pricing: { user: '$49 (More attractive)', competitor: '$65', winner: 'user' },
    reviews: { user: '4.8/5', competitor: '4.2/5', winner: 'user' },
    seoTraffic: { user: '22K', competitor: '78K', winner: 'competitor' },
    ads: { user: '5 active', competitor: '45 active', winner: 'competitor' },
    websiteSpeed: { user: '2.8s', competitor: '1.2s', winner: 'competitor' }
  }
};

const fallbackCompetitors = {
  success: true,
  reasoning: 'Based on category search keyword overlays, ad pressure tracking, and organic keyword overlap indexes.',
  competitors: [
    {
      id: 'comp-1',
      name: 'Vortex Brands',
      logo: 'VB',
      score: 91,
      strength: 'Aggressive',
      platformPresence: ['Instagram', 'TikTok', 'YouTube'],
      followers: '240K',
      engagementRate: '4.8%',
      postingFrequency: '2.4 posts/day',
      adActivity: 'Scaling',
      seoTraffic: '85K/mo',
      pricingInsight: 'Premium Pricing',
      sentimentScore: 'Highly Positive',
      whyStrong: 'Vortex wins attention with higher short-form video cadence, clearer hooks, and lower checkout friction.'
    }
  ]
};

const toPlainObject = (value) => {
  if (!value) return {};
  if (typeof value.toObject === 'function') return value.toObject();
  return value;
};

const toStringArray = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

const normalizeBusinessDetails = (businessDetails) => {
  const source = toPlainObject(businessDetails);

  return {
    ...defaultBusinessDetails,
    ...source,
    name: source.name || source.businessName || source.company || defaultBusinessDetails.name,
    industry: source.industry || source.category || defaultBusinessDetails.industry,
    websiteUrl: source.websiteUrl || source.website || defaultBusinessDetails.websiteUrl,
    competitorKeywords: toStringArray(source.competitorKeywords).length
      ? toStringArray(source.competitorKeywords)
      : defaultBusinessDetails.competitorKeywords,
    shopLinks: toStringArray(source.shopLinks),
    appLinks: toStringArray(source.appLinks),
    mainGrowthGoal: source.mainGrowthGoal || source.growthGoal || defaultBusinessDetails.mainGrowthGoal,
  };
};

const cacheSlug = (prefix, value) => {
  const slug = String(value || defaultBusinessDetails.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);

  return `${prefix}_${slug || 'workspace'}`;
};

const readCachedJson = async (cacheKey, validator) => {
  const cached = await redisCache.get(cacheKey);
  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);
    return validator(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const ensureCompetitorData = (data) => (
  Array.isArray(data?.competitors) ? data : fallbackCompetitors
);

const ensureRecommendationData = (data) => (
  Array.isArray(data?.suggestions) ? data : { success: true, suggestions: fallbackRecommendations }
);

const ensureBattleData = (data) => (
  data?.comparison && data?.gapAnalysis ? data : fallbackBattleMode
);

export const analyzeCompetitors = async (businessDetails) => {
  const normalizedBusiness = normalizeBusinessDetails(businessDetails);
  const cacheKey = cacheSlug('comp_discover_v2', normalizedBusiness.name);
  const cached = await readCachedJson(cacheKey, (data) => Array.isArray(data?.competitors));
  if (cached) {
    logger.info(`Serving cached competitor discovery for ${normalizedBusiness.name}`);
    return cached;
  }

  const prompt = promptTemplates.competitorDiscovery(normalizedBusiness);

  const result = ensureCompetitorData(
    await askGemini(prompt, 'You are an elite competitive intelligence database.')
  );
  
  // Cache the result for 1 hour (3600 seconds)
  await redisCache.set(cacheKey, JSON.stringify(result), 3600);
  
  return result;
};

export const getRecommendations = async (businessDetails, competitorsList = ['Vortex Brands']) => {
  const normalizedBusiness = normalizeBusinessDetails(businessDetails);
  const normalizedCompetitors = Array.isArray(competitorsList) && competitorsList.length > 0
    ? competitorsList
    : ['Vortex Brands'];
  const cacheKey = cacheSlug('recs_v2', normalizedBusiness.name);
  const cached = await readCachedJson(cacheKey, (data) => Array.isArray(data?.suggestions));
  if (cached) {
    logger.info(`Serving cached recommendations for ${normalizedBusiness.name}`);
    return cached;
  }

  const prompt = promptTemplates.recommendations(normalizedBusiness, normalizedCompetitors);

  const result = ensureRecommendationData(
    await askGemini(prompt, 'You are a principal growth engineering director.')
  );
  
  await redisCache.set(cacheKey, JSON.stringify(result), 3600);
  return result;
};

export const runBattleMode = async (competitorName, businessDetails) => {
  const normalizedBusiness = normalizeBusinessDetails(businessDetails);
  const prompt = promptTemplates.battleMode(competitorName || 'Vortex Brands', normalizedBusiness);
  const result = ensureBattleData(
    await askGemini(prompt, 'You are an elite head-to-head battle strategy advisor.')
  );
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
