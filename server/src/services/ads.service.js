export const getAdsAnalytics = async (competitorId) => {
  return {
    competitorId,
    activeAdCount: 45,
    estimatedMonthlyAdSpend: '$22K',
    channelDistribution: [
      { channel: 'Meta (FB/IG)', weight: '65%' },
      { channel: 'TikTok Ads', weight: '25%' },
      { channel: 'Google Display', weight: '10%' }
    ],
    topAdCreatives: [
      { type: 'UGC Video', hooksUsed: 'The one mistake DTC brands make in packaging...', engagementScore: 'High' },
      { type: 'Static Comparison', hooksUsed: 'Why pay 3x for generic SaaS when you get this...', engagementScore: 'Medium' }
    ],
    copywritingAngles: {
      primaryEmotionalTrigger: 'Fear of Missing Out & Authority Proof',
      sampleAdCopy: 'Stop guessing why competitors get all the virality. Get GrowthRadar and get the exact steps to outperform.'
    }
  };
};

export default { getAdsAnalytics };
