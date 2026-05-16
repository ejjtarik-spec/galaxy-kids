"use client";

import { motion } from "framer-motion";

import { Child } from "../../types";

type LeaderboardProps = {
  children: Child[];
};

const podiumGlow = [
  "from-yellow-300 via-orange-400 to-yellow-500",
  "from-slate-200 via-slate-300 to-slate-400",
  "from-orange-400 via-amber-500 to-yellow-700",
];

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
    <div className="overflow-hidden rounded-[2.8rem] border border-cyan-400/20 bg-[#14072F] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-cyan-500 via-indigo-600 to-fuchsia-700 p-6 text-white">
        <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-pink-400/20 blur-3xl" />

        <div className="relative z-10">
          <p className="text-sm font-black uppercase tracking-widest text-cyan-100">
            Hall des héros
          </p>

          <h2 className="mt-1 text-4xl font-black leading-tight drop-shadow-lg">
            🏆 Classement familial
          </h2>

          <p className="mt-2 text-sm font-bold text-white/70">
            Les champions galactiques de la semaine 🚀
          </p>
        </div>
      </div>

      <div className="space-y-4 bg-[#100626] p-5">
        {sortedChildren.map((child, index) => {
          const xp = child.xp || 0;
          const coins = child.coins || 0;
          const streak = child.streak || 0;

          const isTop3 = index < 3;

          return (
            <motion.div
              key={child.id}
              whileHover={{
                scale: 1.015,
              }}
              className={`
                relative
                overflow-hidden
                rounded-[2.3rem]
                border
                p-5
                shadow-[0_15px_60px_rgba(0,0,0,0.35)]
                transition
                ${
                  isTop3
                    ? "border-yellow-300/30 bg-[#221044]"
                    : "border-white/10 bg-[#1A1035]"
                }
              `}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-cyan-400/[0.04]" />

              {isTop3 && (
                <>
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-yellow-300/20 blur-3xl" />

                  <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-pink-500/10 blur-3xl" />
                </>
              )}

              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={
                      index === 0
                        ? {
                            y: [0, -5, 0],
                            rotate: [0, -4, 4, 0],
                          }
                        : undefined
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className={`
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-[2rem]
                      text-5xl
                      shadow-2xl
                      ${
                        isTop3
                          ? `bg-gradient-to-br ${podiumGlow[index]}`
                          : "bg-white/10"
                      }
                    `}
                  >
                    {child.avatar || "🚀"}
                  </motion.div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-3xl">
                        {getMedal(index)}
                      </span>

                      <h3 className="text-2xl font-black text-white">
                        {child.name}
                      </h3>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="rounded-full bg-orange-400/15 px-3 py-1 text-xs font-black text-orange-200">
                        🔥 {streak} jours
                      </span>

                      <span className="rounded-full bg-yellow-300/15 px-3 py-1 text-xs font-black text-yellow-200">
                        🪙 {coins}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-black text-cyan-200">
                    ⭐ {xp}
                  </p>

                  <p className="text-xs font-black uppercase tracking-wide text-white/50">
                    XP Total
                  </p>
                </div>
              </div>

              {index === 0 && (
                <motion.div
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="pointer-events-none absolute inset-0 rounded-[2.3rem] border border-yellow-300/30"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}