// Temporary mock implementation (will connect to Spring Boot later)

export async function updateTrustScore(userId: string): Promise<number> {
  console.log("Mock trust score update for:", userId);

  // Simulate async operation
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return a fake score for now
  return 100;
}
