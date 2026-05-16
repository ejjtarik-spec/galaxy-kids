"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import GameButton from "../../components/ui/GameButton";

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

  const [opening, setOpening] = useState(false);

  const handleClaim = () => {
    if (alreadyClaimed || opening) return;

    setOpening(true);

    setTimeout(() => {
      onClaim();
    }, 450);

    setTimeout(() => {
      setOpening(false);
    }, 1200);
  };

  return (
    <div className="relative mt-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 shadow-[0_25px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
      <div className="relative overflow-hidden rounded-[2.4rem] bg-gradient-to-br from-[#23103D] via-[#1E163A] to-[#2A1248] p-5 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-yellow-300/30 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-pink-400/30 blur-3xl" />

        <AnimatePresence>
          {opening && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.6,
              }}
              animate={{
                opacity: 1,
                scale: 1.5,
              }}
              exit={{
                opacity: 0,
                scale: 1.9,
              }}
              transition={{
                duration: 0.6,
              }}
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            >
              <div className="h-48 w-48 rounded-full bg-yellow-300/40 blur-3xl" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10 flex items-center gap-4">
          <motion.div
            animate={
              opening
                ? {
                    rotate: [-10, 10, -12, 12, 0],
                    scale: [1, 1.2, 0.9, 1.3, 1],
                  }
                : {
                    rotate: [0, -5, 5, -5, 0],
                    y: [0, -6, 0],
                  }
            }
            transition={{
              duration: opening ? 0.7 : 2.5,
              repeat: opening ? 0 : Infinity,
            }}
            className="
              relative
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-[2rem]
              bg-gradient-to-br
              from-yellow-300
              via-orange-400
              to-pink-500
              text-6xl
              shadow-[0_20px_80px_rgba(250,204,21,0.45)]
            "
          >
            <motion.span
              animate={
                opening
                  ? {
                      y: [-2, -22, 0],
                      rotate: [0, -15, 15, 0],
                    }
                  : undefined
              }
              transition={{
                duration: 0.7,
              }}
            >
              {alreadyClaimed ? "✅" : "🎁"}
            </motion.span>

            {!alreadyClaimed && (
              <motion.div
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                }}
                className="pointer-events-none absolute inset-0 rounded-[2rem] border-2 border-yellow-200/60"
              />
            )}
          </motion.div>

          <div className="flex-1">
            <p className="text-sm font-black uppercase tracking-wide text-orange-200">
              Coffre quotidien
            </p>

            <h2 className="mt-1 text-3xl font-black leading-tight">
              Bonus de {child.name}
            </h2>

            <p className="mt-2 text-sm font-bold text-white/70">
              Ouvre le coffre pour gagner ton énergie cosmique 🔥
            </p>
          </div>
        </div>

        <div className="relative z-10 mt-6 rounded-[2rem] bg-white/10 p-4 shadow-inner backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-white/70">
                Série actuelle
              </p>

              <p className="mt-1 text-4xl font-black text-orange-300">
                🔥 {streak}
              </p>
            </div>

            <div className="rounded-[1.5rem] bg-yellow-300/20 px-5 py-4 text-center shadow-lg">
              <p className="text-xs font-black uppercase text-yellow-100">
                Dans le coffre
              </p>

              <p className="mt-2 text-xl font-black text-white">
                +10 XP ⭐
              </p>

              <p className="text-sm font-black text-white">
                +5 🪙
              </p>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {opening && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                y: -10,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -40,
                scale: 0.8,
              }}
              className="
                relative
                z-10
                mt-5
                rounded-[2rem]
                bg-gradient-to-r
                from-yellow-300
                via-orange-400
                to-pink-500
                px-5
                py-4
                text-center
                text-white
                shadow-[0_0_50px_rgba(250,204,21,0.7)]
              "
            >
              <p className="text-2xl font-black">
                ✨ +10 XP • +5 🪙 ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!alreadyClaimed ? (
          <div className="relative z-10 mt-6">
            <GameButton
              onClick={handleClaim}
              disabled={opening}
              className="
                w-full
                bg-gradient-to-r
                from-yellow-300
                via-orange-400
                to-pink-500
                text-lg
              "
            >
              {opening
                ? "✨ Ouverture du coffre..."
                : "🎁 Ouvrir le coffre du jour"}
            </GameButton>
          </div>
        ) : (
          <div className="relative z-10 mt-6 rounded-[2rem] bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-5 text-center shadow-2xl">
            <p className="text-xl font-black text-white">
              ✅ Coffre déjà ouvert
            </p>

            <p className="mt-2 text-sm font-bold text-white/80">
              Reviens demain pour continuer ta série 🔥
            </p>
          </div>
        )}

        <motion.div
          animate={{
            opacity: [0.12, 0.4, 0.12],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="pointer-events-none absolute inset-0 rounded-[2.4rem] border border-white/10"
        />
      </div>
    </div>
  );
}