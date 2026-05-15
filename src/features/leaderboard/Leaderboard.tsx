import { Child } from "../../types";

type LeaderboardProps = {
  children: Child[];
};

export default function Leaderboard({
  children,
}: LeaderboardProps) {
  const sortedChildren = [...children].sort(
    (a, b) => (b.xp || 0) - (a.xp || 0)
  );

  const getMedal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";

    return "⭐";
  };

  return (
    <div className="rounded-3xl bg-white p-5 shadow-xl">
      <h2 className="text-2xl font-bold">
        🏆 Classement familial
      </h2>

      <div className="mt-4 flex flex-col gap-3">
        {sortedChildren.map((child, index) => (
          <div
            key={child.id}
            className="flex items-center justify-between rounded-2xl border p-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {getMedal(index)}
              </span>

              <div>
                <p className="font-bold">
                  {child.avatar} {child.name}
                </p>

                <p className="text-sm text-gray-500">
                  🔥 {child.streak || 0} jours
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold">
                ⭐ {child.xp || 0} XP
              </p>

              <p className="text-sm text-gray-500">
                🪙 {child.coins || 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}