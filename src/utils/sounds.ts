export function playSound(src: string) {
    if (typeof window === "undefined") return;
  
    const audio = new Audio(src);
    audio.volume = 0.45;
    audio.play().catch(() => {
      // Le navigateur peut bloquer le son si aucun geste utilisateur n’a eu lieu.
    });
  }
  
  export const sounds = {
    reward: "/sounds/reward.mp3",
    levelUp: "/sounds/level-up.mp3",
    click: "/sounds/click.mp3",
    buy: "/sounds/buy.mp3",
  };