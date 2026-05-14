export const getStreakMessage = (streak: number) => {
    if (streak >= 30) return "👑 Légende";
    if (streak >= 14) return "🔥 Incroyable";
    if (streak >= 7) return "🚀 Super série";
    if (streak >= 3) return "⭐ Bien joué";
  
    return "🌱 Début";
  };