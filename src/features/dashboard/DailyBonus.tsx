"use client";

import { motion } from "framer-motion";

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
  const streak = child.streak || 0;

  return (
    <div className="relative mt-6 overflow-hidden rounded-[2rem] bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 p-[2px] shadow-[0_20px_80px_rgba(249,115,22,0.35)]">
      <div className="relative overflow-hidden rounded-[1.9rem] bg-[#1E163A] p-5 text-white">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yellow-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-pink-400/20 blur-3xl" />

        <div className="relative z-10 flex items-center gap-4">
          <motion.div
            animate={{
              rotate: [0, -8, 8, -8, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-yellow-300 to-orange-400 text-5xl shadow-2xl"
          >
            🎁
          </motion.div>

          <div className="flex-1">
            <p className="text-sm font-black uppercase tracking-wide text-orange-200">
              Récompense quotidienne
            </p>

            <h2 className="mt-1 text-2xl font-black leading-tight">
              Bonus de {child.name}
            </h2>

            <p className="mt-2 text-sm font-bold text-white/70">
              Reviens chaque jour pour augmenter ta série 🔥
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-6 rounded-3xl bg-white/10 p-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white/70">
                Série actuelle
              </p>

              <p className="mt-1 text-3xl font-black text-orange-300">
                🔥 {streak}
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-300/20 px-4 py-3 text-center">
              <p className="text-xs font-black text-yellow-100">
                Bonus du jour
              </p>

              <p className="mt-1 text-lg font-black text-white">
                +10 XP ⭐
              </p>

              <p className="text-sm font-black text-white">
                +5 🪙
              </p>
            </div>
          </div>
        </div>

        {!alreadyClaimed ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onClaim}
            className="
              relative
              z-10
              mt-6
              w-full
              rounded-3xl
              bg-gradient-to-r
              from-yellow-300
              via-orange-400
              to-pink-500
              px-6
              py-4
              text-lg
              font-black
              text-white
              shadow-2xl
            "
          >
            ✨ Récupérer le bonus du jour
          </motion.button>
        ) : (
          <div className="relative z-10 mt-6 rounded-3xl bg-green-500 px-6 py-4 text-center shadow-xl">
            <p className="text-lg font-black text-white">
              ✅ Bonus déjà récupéré
            </p>

            <p className="mt-1 text-sm font-bold text-white/80">
              Reviens demain pour continuer ta série 🔥
            </p>
          </div>
        )}

        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="pointer-events-none absolute inset-0 rounded-[1.9rem] border border-white/10"
        />
      </div>
    </div>
  );
}