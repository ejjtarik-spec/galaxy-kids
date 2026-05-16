"use client";

import { motion } from "framer-motion";

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
    <motion.div
      onClick={onSelect}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      className={`relative cursor-pointer overflow-hidden rounded-[2.5rem] border p-5 shadow-[0_25px_100px_rgba(0,0,0,0.4)] transition ${
        isSelected
          ? "border-cyan-300/60 bg-[#160A38]"
          : "border-white/10 bg-[#100626]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-purple-400/[0.08]" />

      {isSelected && (
        <>
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-pink-500/25 blur-3xl" />
        </>
      )}

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <motion.div
            animate={
              isSelected
                ? {
                    y: [0, -6, 0],
                    rotate: [0, -5, 5, 0],
                  }
                : undefined
            }
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className={`flex h-20 w-20 items-center justify-center rounded-[2rem] text-5xl shadow-2xl ${
              isSelected
                ? "bg-gradient-to-br from-cyan-300 via-purple-400 to-pink-500"
                : "bg-white/10"
            }`}
          >
            {child.avatar || "🚀"}
          </motion.div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-black text-white">
                {child.name}
              </h2>

              {isSelected && (
                <span className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-black text-purple-950 shadow-[0_0_25px_rgba(103,232,249,0.65)]">
                  Actif
                </span>
              )}
            </div>

            <p className="mt-1 text-sm font-bold text-white/60">
              {child.age} ans • Niveau {level}
            </p>
          </div>
        </div>

        {showDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="relative z-20 rounded-2xl bg-red-500/15 px-3 py-2 text-xs font-black text-red-200 transition hover:bg-red-500 hover:text-white active:scale-95"
          >
            Supprimer
          </button>
        )}
      </div>

      <div className="relative z-10 mt-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-black text-cyan-200">
            ⭐ Progression XP
          </p>

          <p className="text-xs font-black text-white/60">
            {xp} / {nextLevelXP}
          </p>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-white/10 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-yellow-300 shadow-[0_0_25px_rgba(103,232,249,0.8)]"
          />
        </div>
      </div>

      <div className="relative z-10 mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-[1.8rem] border border-white/10 bg-white/10 p-3 text-center shadow-xl backdrop-blur-xl">
          <p className="text-2xl">⭐</p>
          <p className="text-xl font-black text-cyan-200">{xp}</p>
          <p className="text-[11px] font-black uppercase text-white/40">
            XP
          </p>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-white/10 p-3 text-center shadow-xl backdrop-blur-xl">
          <p className="text-2xl">🪙</p>
          <p className="text-xl font-black text-yellow-200">{coins}</p>
          <p className="text-[11px] font-black uppercase text-white/40">
            Pièces
          </p>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-white/10 p-3 text-center shadow-xl backdrop-blur-xl">
          <p className="text-2xl">🔥</p>
          <p className="text-xl font-black text-orange-300">{streak}</p>
          <p className="text-[11px] font-black uppercase text-white/40">
            Série
          </p>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          {badges.slice(0, 4).map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-yellow-300/15 px-3 py-1 text-sm font-black text-yellow-200 shadow-sm"
            >
              {badge}
            </span>
          ))}

          {badges.length > 4 && (
            <span className="rounded-full bg-cyan-300/15 px-3 py-1 text-sm font-black text-cyan-200 shadow-sm">
              +{badges.length - 4}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}