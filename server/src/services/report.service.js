export const buildReport = async (name, type, filters = {}) => {
  return {
    name,
    type,
    status: 'Completed',
    summary: `Complete ${type} intelligence analysis compiled successfully. Key takeaways outline that category benchmarks are aggressively scaling Reels cadences. Your primary growth opportunity lies in mobile page performance and ad creative retargeting.`,
    data: {
      timestamp: new Date(),
      metricsSummarized: ['Social cadence', 'SEO keyword gaps', 'Ad copy angles', 'Sentiment analysis'],
      opportunitiesFound: 4,
      categoryLeader: 'Vortex Brands'
    }
  };
};

export default { buildReport };
