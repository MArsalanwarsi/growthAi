export const promptTemplates = {
  competitorDiscovery: (businessDetails) => `
    You are an elite B2B competitor discovery engine. 
    Analyze the following business parameters:
    - Business Name: ${businessDetails.name}
    - Industry: ${businessDetails.industry}
    - Website: ${businessDetails.websiteUrl}
    - Keywords: ${(businessDetails.competitorKeywords || []).join(', ')}
    - Target Country: ${businessDetails.targetCountry || 'United States'}
    - Target Audience: ${businessDetails.targetAudience || 'General'}
    - Budget Level: ${businessDetails.budget || 'Standard'}
    - Growth Goal: ${businessDetails.mainGrowthGoal || 'Growth'}
    - Social Accounts: Instagram (${businessDetails.instagramHandle || 'None'}), TikTok (${businessDetails.tiktokAccount || 'None'}), Facebook (${businessDetails.facebookPage || 'None'}), YouTube (${businessDetails.youtubeChannel || 'None'})
    - Sales Links: Shop Links (${(businessDetails.shopLinks || []).join(', ') || 'None'}), App Links (${(businessDetails.appLinks || []).join(', ') || 'None'})

    Return a valid JSON object listing 3 potential direct competitors. For each competitor, provide:
    - name, logo initials, score (1-100), strength level (Aggressive, Moderate, Testing), platformPresence (array), followers count, engagementRate, postingFrequency, adActivity, seoTraffic, pricingInsight, sentimentScore, and a clear, descriptive 'whyStrong' summary comparing them directly to this business's unique traits, target audience, and channels.
    Ensure only valid, parseable JSON is returned.
  `,

  recommendations: (businessDetails, competitors) => `
    You are a principal growth strategist.
    Provide strategic suggestions for '${businessDetails.name}' in the '${businessDetails.industry}' sector, aiming to achieve the goal: '${businessDetails.mainGrowthGoal}'.
    
    Business Profiles:
    - Target Country: ${businessDetails.targetCountry || 'United States'}
    - Target Audience: ${businessDetails.targetAudience || 'General'}
    - Budget Level: ${businessDetails.budget || 'Standard'}
    - Social Profiles: Instagram (${businessDetails.instagramHandle || 'None'}), TikTok (${businessDetails.tiktokAccount || 'None'}), Facebook (${businessDetails.facebookPage || 'None'}), YouTube (${businessDetails.youtubeChannel || 'None'})

    Benchmark against key competitors: ${competitors.join(', ')}.

    Provide exactly 4 detailed recommendations grouped under: 'Content', 'Website', 'SEO', 'Ads', 'Business'.
    Each suggestion must contain:
    - category, title, priority (High/Medium/Low), difficulty (High/Medium/Low), impact score (1-100), reason, suggested action, expected outcome.
    Ensure suggestions are highly custom to their budget, target audience, and active platforms (Instagram/TikTok/Facebook/YouTube).
    Return ONLY a valid JSON object.
  `,

  battleMode: (competitorName, businessDetails) => `
    You are an elite head-to-head comparison model. Compare the user's business:
    - Name: ${businessDetails.name}
    - Industry: ${businessDetails.industry}
    - Target Audience: ${businessDetails.targetAudience || 'General'}
    - Goal: ${businessDetails.mainGrowthGoal}
    with the competitor: ${competitorName}.

    Determine a winner per category, an overall winner, a detailed gap analysis, a suggested counter-strategy, and comparison values for: followers, engagement, postingFrequency, pricing, reviews, seoTraffic, ads, and websiteSpeed.
    Return ONLY a valid JSON object.
  `,

  sentimentAnalysis: (competitorName) => `
    You are a customer sentiment researcher. Analyze public customer reviews and complaints for '${competitorName}'.
    Identify core weaknesses and complaints, such as:
    - Slow delivery, Bad support, High pricing, Low quality, Missing features, App bugs, Negative review clusters.

    Then produce:
    - marketingAngles, positioningOpportunities, productImprovementIdeas, and a competitorWeaknessExploitationStrategy.
    Return ONLY a valid JSON object.
  `
};

export default promptTemplates;
