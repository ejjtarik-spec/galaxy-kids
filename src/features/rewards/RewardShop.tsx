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
  return (
    <div className="mt-6 rounded-3xl bg-white p-5 shadow-xl">
      <h2 className="text-xl font-bold">🎁 Boutique de {child.name}</h2>

      <p className="mt-1 text-sm text-gray-500">
        Pièces disponibles : 🪙 {child.coins || 0}
      </p>

      <div className="mt-4 flex flex-col gap-3">
        {rewards.map((reward) => (
          <div
            key={reward.name}
            className="flex items-center justify-between rounded-2xl border p-4"
          >
            <div>
              <p className="font-bold">{reward.name}</p>

              <p className="text-sm text-gray-500">
                Prix : 🪙 {reward.price}
              </p>
            </div>

            <button
              onClick={() => onBuyReward(reward)}
              className="rounded-xl bg-yellow-500 px-4 py-2 font-bold text-white"
            >
              Acheter
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}