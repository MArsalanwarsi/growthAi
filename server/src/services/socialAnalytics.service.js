export const getSocialAnalytics = async (competitorId) => {
  return {
    competitorId,
    instagram: {
      followers: '240K',
      growthRate: '+14.2%',
      engagementRate: '4.8%',
      postingFrequency: '2.4 posts/day',
      contentMix: [
        { type: 'Reels', percentage: 65, averageViews: '42K' },
        { type: 'Images', percentage: 25, averageViews: '18K' },
        { type: 'Carousels', percentage: 10, averageViews: '24K' }
      ],
      topPerformingHashtags: ['#ecommercegrowth', '#dtcbrand', '#marketingtips'],
      videoCadenceExplanation: 'Cadence is 4.8x higher than industry average, creating a highly compounding top-of-funnel reach.'
    },
    tiktok: {
      followers: '190K',
      growthRate: '+34.5%',
      engagementRate: '8.2%',
      postingFrequency: '3.0 posts/day',
      viralIdeas: [
        { hook: 'The one mistake DTC brands make in packaging...', views: '1.2M' },
        { hook: 'Behind the scenes at our warehouse on Monday...', views: '450K' }
      ]
    }
  };
};

export default { getSocialAnalytics };
