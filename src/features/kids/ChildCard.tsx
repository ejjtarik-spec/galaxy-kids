import { Child } from "../../types";

type ChildCardProps = {
  child: Child;
  isSelected: boolean;
  level: number;
  progress: number;
  nextLevelXP: number;
  badges: string[];
  showDelete?: boolean;
  onSelect: () => void;
  onDelete: () => void;
};

export default function ChildCard({
  child,
  isSelected,
  level,
  progress,
  nextLevelXP,
  badges,
  showDelete = true,
  onSelect,
  onDelete,
}: ChildCardProps) {
  const xp = child.xp || 0;
  const coins = child.coins || 0;
  const streak = child.streak || 0;

  return (
    <div
      onClick={onSelect}
      className={`relative cursor-pointer overflow-hidden rounded-[2rem] border-2 p-5 shadow-xl transition active:scale-[0.98] ${
        isSelected
          ? "border-purple-400 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50"
          : "border-white bg-white"
      }`}
    >
      {isSelected && (
        <>
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-300/40 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-pink-300/40 blur-2xl" />
        </>
      )}

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-3xl text-4xl shadow-lg ${
              isSelected ? "bg-white" : "bg-purple-50"
            }`}
          >
            {child.avatar || "🚀"}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-gray-800">
                {child.name}
              </h2>

              {isSelected && (
                <span className="rounded-full bg-purple-600 px-2 py-1 text-xs font-black text-white">
                  Actif
                </span>
              )}
            </div>

            <p className="mt-1 text-sm font-bold text-gray-500">
              {child.age} ans • Niveau {level}
            </p>
          </div>
        </div>

        {showDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded-2xl bg-red-50 px-3 py-2 text-xs font-black text-red-500 transition hover:bg-red-500 hover:text-white active:scale-95"
          >
            Supprimer
          </button>
        )}
      </div>

      <div className="relative mt-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-black text-purple-700">
            ⭐ Progression XP
          </p>

          <p className="text-xs font-black text-gray-500">
            {xp} / {nextLevelXP}
          </p>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-white shadow-inner">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-3xl bg-white/80 p-3 text-center shadow-sm">
          <p className="text-xl">⭐</p>
          <p className="text-lg font-black text-purple-700">{xp}</p>
          <p className="text-[11px] font-bold text-gray-400">XP</p>
        </div>

        <div className="rounded-3xl bg-white/80 p-3 text-center shadow-sm">
          <p className="text-xl">🪙</p>
          <p className="text-lg font-black text-yellow-600">{coins}</p>
          <p className="text-[11px] font-bold text-gray-400">Pièces</p>
        </div>

        <div className="rounded-3xl bg-white/80 p-3 text-center shadow-sm">
          <p className="text-xl">🔥</p>
          <p className="text-lg font-black text-orange-500">{streak}</p>
          <p className="text-[11px] font-bold text-gray-400">Série</p>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="relative mt-5 flex flex-wrap gap-2">
          {badges.slice(0, 4).map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-black text-yellow-700 shadow-sm"
            >
              {badge}
            </span>
          ))}

          {badges.length > 4 && (
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-black text-purple-700 shadow-sm">
              +{badges.length - 4}
            </span>
          )}
        </div>
      )}
    </div>
  );
}