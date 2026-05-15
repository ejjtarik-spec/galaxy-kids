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
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-3xl p-5 shadow-xl transition ${
        isSelected ? "bg-purple-200" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          {child.avatar} {child.name}
        </h2>

        {showDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="rounded-xl bg-red-500 px-3 py-1 text-sm font-bold text-white"
          >
            Supprimer
          </button>
        )}
      </div>

      <p className="mt-1 text-sm text-gray-600">Âge : {child.age} ans</p>

      <p className="mt-2 font-bold">⭐ Niveau {level}</p>

      <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-purple-600 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-1 text-xs text-gray-500">
        {child.xp || 0} / {nextLevelXP} XP
      </p>

      <p className="mt-2 text-sm">🪙 {child.coins || 0} pièces</p>

      {badges.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-yellow-100 px-3 py-1 text-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}