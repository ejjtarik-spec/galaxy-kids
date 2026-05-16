"use client";

import GameButton from "../../components/ui/GameButton";

import { Child, Reward } from "../../types";

type RewardShopProps = {
  child: Child;
  rewards: Reward[];
  onBuyReward: (reward: Reward) => void;
};

const rewardIcons = ["🎁", "🧸", "🍭", "🎮", "🚀", "👑", "💎", "🪄"];

export default function RewardShop({
  child,
  rewards,
  onBuyReward,
}: RewardShopProps) {
  const coins = child.coins || 0;

  return (
    <div className="mt-6 overflow-hidden rounded-[2.8rem] border border-fuchsia-400/20 bg-[#14072F] shadow-[0_30px_120px_rgba(0,0,0,0.5)]">
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-600 p-6 text-white">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-yellow-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-fuchsia-400/30 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-widest text-yellow-100">
            Boutique cosmique
          </p>

          <h2 className="mt-1 text-3xl font-black leading-tight drop-shadow-lg">
            🎁 Récompenses de {child.name}
          </h2>

          <div className="mt-5 rounded-[2rem] border border-white/20 bg-[#1B0B3F]/60 p-4 text-center shadow-inner backdrop-blur-xl">
            <p className="text-sm font-black uppercase text-yellow-100">
              Pièces disponibles
            </p>

            <p className="mt-1 text-5xl font-black text-white drop-shadow-lg">
              🪙 {coins}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-[#100626] p-5">
        {rewards.map((reward, index) => {
          const canBuy = coins >= reward.price;
          const missingCoins = reward.price - coins;
          const icon = rewardIcons[index % rewardIcons.length];

          return (
            <div
              key={reward.name}
              className={`relative overflow-hidden rounded-[2.2rem] border p-4 shadow-xl transition ${
                canBuy
                  ? "border-yellow-300/40 bg-[#251044]"
                  : "border-white/10 bg-[#1A1230]"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-purple-400/[0.06]" />

              {canBuy ? (
                <>
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-300/25 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-pink-400/20 blur-3xl" />
                </>
              ) : (
                <div className="pointer-events-none absolute inset-0 bg-black/25" />
              )}

              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] text-4xl shadow-2xl ${
                      canBuy
                        ? "bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500"
                        : "bg-[#2A2140]"
                    }`}
                  >
                    {canBuy ? icon : "🔒"}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xl font-black leading-tight text-white drop-shadow">
                      {reward.name}
                    </p>

                    <p className="mt-1 text-sm font-bold text-yellow-100/80">
                      Prix : 🪙 {reward.price}
                    </p>

                    {!canBuy && (
                      <p className="mt-1 text-xs font-black text-red-300">
                        Il manque {missingCoins} pièces
                      </p>
                    )}

                    {canBuy && (
                      <p className="mt-1 text-xs font-black text-yellow-200">
                        Disponible maintenant ✨
                      </p>
                    )}
                  </div>
                </div>

                <GameButton
                  onClick={() => onBuyReward(reward)}
                  disabled={!canBuy}
                  className={
                    canBuy
                      ? "shrink-0 bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500"
                      : "shrink-0 bg-[#3A3150] text-white/70"
                  }
                >
                  {canBuy ? "Acheter" : "Bloqué"}
                </GameButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}