export const getSeoAnalytics = async (competitorId) => {
  return {
    competitorId,
    authorityScore: 68,
    organicTrafficEstimate: '85K/mo',
    backlinkCount: 14200,
    topKeywords: [
      { term: 'best ecommerce advisor', volume: 2400, ranking: 1, trafficShare: '42%' },
      { term: 'growth tools for retail', volume: 1800, ranking: 3, trafficShare: '18%' },
      { term: 'competitor analytics app', volume: 5400, ranking: 4, trafficShare: '12%' }
    ],
    keywordGaps: [
      { keyword: 'dtc automation strategies', searchVolume: 1200, difficulty: 'Low', intent: 'Commercial' },
      { keyword: 'social signal analytics dashboard', searchVolume: 850, difficulty: 'Medium', intent: 'Transactional' }
    ]
  };
};

export default { getSeoAnalytics };
