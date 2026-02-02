import { mockProducts, MockProduct } from './mock-data';

export function getAIRecommendations(
  userLocation: string,
  limit: number = 6
): MockProduct[] {
  // Rule-based AI scoring system
  const scoredProducts = mockProducts.map((product) => {
    const aiScore =
      product.demand_score +
      product.region_boost +
      product.season_factor +
      product.expected_margin * 0.5;

    return {
      ...product,
      aiScore,
    };
  });

  return scoredProducts
    .sort((a, b) => b.aiScore - a.aiScore)
    .slice(0, limit);
}

export function calculateTrustScore(
  successfulOrders: number,
  disputes: number,
  totalTransactionValue: number
): number {
  const baseScore = 500;
  const orderBonus = successfulOrders * 10;
  const disputePenalty = disputes * 20;
  const volumeBonus = Math.min(totalTransactionValue / 1000, 200);

  return Math.max(
    0,
    Math.min(1000, baseScore + orderBonus - disputePenalty + volumeBonus)
  );
}

export function getDemandBadgeColor(level: string): string {
  switch (level) {
    case 'High':
      return 'bg-green-500';
    case 'Medium':
      return 'bg-yellow-500';
    case 'Low':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
}
