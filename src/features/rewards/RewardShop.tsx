import { Child, Reward } from "../../types";

type RewardShopProps = {
  child: Child;
  rewards: Reward[];
  onBuyReward: (reward: Reward) => void;
};

export default function RewardShop({
  child,
  rewards,
  onBuyReward,
}: RewardShopProps) {
  const coins = child.coins || 0;

  return (
    <div className="mt-6 overflow-hidden rounded-[2rem] bg-white shadow-xl">
      <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 p-5 text-white">
        <p className="text-sm font-black text-white/80">Boutique magique</p>

        <h2 className="text-2xl font-black">🎁 Récompenses de {child.name}</h2>

        <div className="mt-4 rounded-3xl bg-white/20 p-4 text-center backdrop-blur">
          <p className="text-sm font-bold text-white/80">Pièces disponibles</p>
          <p className="text-4xl font-black">🪙 {coins}</p>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {rewards.map((reward) => {
          const canBuy = coins >= reward.price;
          const missingCoins = reward.price - coins;

          return (
            <div
              key={reward.name}
              className={`relative overflow-hidden rounded-3xl border-2 p-4 shadow-sm transition ${
                canBuy
                  ? "border-yellow-200 bg-yellow-50"
                  : "border-gray-200 bg-gray-50 opacity-80"
              }`}
            >
              {canBuy && (
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-yellow-300/40 blur-2xl" />
              )}

              <div className="relative flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow ${
                      canBuy ? "bg-yellow-400" : "bg-gray-200"
                    }`}
                  >
                    🎁
                  </div>

                  <div>
                    <p className="text-lg font-black text-gray-800">
                      {reward.name}
                    </p>

                    <p className="text-sm font-bold text-gray-500">
                      Prix : 🪙 {reward.price}
                    </p>

                    {!canBuy && (
                      <p className="mt-1 text-xs font-black text-red-500">
                        Il manque {missingCoins} pièces
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onBuyReward(reward)}
                  disabled={!canBuy}
                  className={`rounded-2xl px-4 py-3 text-sm font-black text-white shadow-lg transition active:scale-95 disabled:cursor-not-allowed ${
                    canBuy
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                      : "bg-gray-300"
                  }`}
                >
                  {canBuy ? "Acheter" : "Bloqué"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}