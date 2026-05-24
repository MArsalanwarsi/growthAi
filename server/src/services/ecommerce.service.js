export const getEcommerceAnalytics = async (competitorId) => {
  return {
    competitorId,
    estimatedMonthlyRevenue: '$450K',
    checkoutFrictionScore: 'Low (1.2s avg. checkouts)',
    shopifyIntegration: true,
    topSellingProducts: [
      { name: 'GrowthRadar Professional Hub', price: '$99/mo', estimatedSales: '1,420 units/mo' },
      { name: 'AI Advisory Module Add-on', price: '$49/mo', estimatedSales: '820 units/mo' }
    ],
    checkoutFunnelSteps: [
      { step: 'Cart Addition', dropoffRate: '12%' },
      { step: 'Information Form', dropoffRate: '18%' },
      { step: 'Payment Express', dropoffRate: '4%' }
    ]
  };
};

export default { getEcommerceAnalytics };
