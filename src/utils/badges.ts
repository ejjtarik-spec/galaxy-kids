export const getBadges = (xp: number, coins: number) => {
    const badges = [];
  
    if (xp >= 20) {
      badges.push("🌟 Premier exploit");
    }
  
    if (xp >= 100) {
      badges.push("🚀 Petit héros");
    }
  
    if (xp >= 300) {
      badges.push("🏆 Champion");
    }
  
    if (coins >= 50) {
      badges.push("💰 Collectionneur");
    }
  
    if (coins >= 100) {
      badges.push("👑 Roi des étoiles");
    }
  
    return badges;
  };