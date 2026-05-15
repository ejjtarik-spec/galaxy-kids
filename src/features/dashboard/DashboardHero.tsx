"use client";

import { motion } from "framer-motion";

type DashboardHeroProps = {
  name: string;
};

export default function DashboardHero({
  name,
}: DashboardHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 py-8 text-white shadow-[0_25px_120px_rgba(99,102,241,0.35)]">
      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-pink-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-yellow-300/20 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-8 text-white/30">✦</div>
        <div className="absolute right-16 top-16 text-2xl text-white/20">
          ✦
        </div>
        <div className="absolute bottom-10 left-20 text-xl text-white/20">
          ✦
        </div>
        <div className="absolute bottom-16 right-10 text-white/30">✦</div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-black uppercase tracking-[0.2em] text-purple-100"
            >
              Galaxy Kids
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-4xl font-black leading-tight"
            >
              Bonjour {name} 🚀
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-3 max-w-xs text-sm font-bold text-white/80"
            >
              Transforme les missions quotidiennes en aventure spatiale.
            </motion.p>
          </div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 6, -6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-[2rem]
              bg-white/10
              text-6xl
              shadow-2xl
              backdrop-blur
            "
          >
            🪐
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur">
            <p className="text-2xl">🚀</p>

            <p className="mt-2 text-lg font-black">Missions</p>

            <p className="text-xs font-bold text-white/70">
              Défis quotidiens
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur">
            <p className="text-2xl">⭐</p>

            <p className="mt-2 text-lg font-black">XP</p>

            <p className="text-xs font-bold text-white/70">
              Progression
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur">
            <p className="text-2xl">🎁</p>

            <p className="mt-2 text-lg font-black">Rewards</p>

            <p className="text-xs font-bold text-white/70">
              Récompenses
            </p>
          </div>
        </div>
      </div>

      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-white/10"
      />
    </div>
  );
}