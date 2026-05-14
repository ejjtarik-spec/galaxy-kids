export const getLevelFromXP = (xp: number) => {
    if (xp >= 500) return 5;
    if (xp >= 300) return 4;
    if (xp >= 150) return 3;
    if (xp >= 50) return 2;
  
    return 1;
  };
  
  export const getNextLevelXP = (xp: number) => {
    if (xp < 50) return 50;
    if (xp < 150) return 150;
    if (xp < 300) return 300;
    if (xp < 500) return 500;
  
    return 500;
  };