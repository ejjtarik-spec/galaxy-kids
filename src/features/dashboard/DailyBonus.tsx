import { Child } from "../../types";

type DailyBonusProps = {
  child: Child;
  today: string;
  onClaim: () => void;
};

export default function DailyBonus({
  child,
  today,
  onClaim,
}: DailyBonusProps) {
  const alreadyClaimed = child.lastBonusDate === today;

  return (
    <div className="mt-6 rounded-3xl bg-orange-100 p-5 shadow-xl">
      <h2 className="text-xl font-bold">
        🔥 Bonus quotidien de {child.name}
      </h2>

      <p className="mt-1 text-sm text-gray-600">
        Série actuelle : 🔥 {child.streak || 0} jour(s)
      </p>

      <button
        onClick={onClaim}
        disabled={alreadyClaimed}
        className={`mt-4 rounded-xl p-3 font-bold text-white ${
          alreadyClaimed ? "bg-gray-400" : "bg-orange-500"
        }`}
      >
        {alreadyClaimed
          ? "Bonus déjà récupéré ✅"
          : "🎁 Récupérer le bonus du jour"}
      </button>
    </div>
  );
}