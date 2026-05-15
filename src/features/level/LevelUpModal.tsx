"use client";

import { AnimatePresence, motion } from "framer-motion";

type LevelUpModalProps = {
  level: number;
  open: boolean;
  onClose: () => void;
};

export default function LevelUpModal({
  level,
  open,
  onClose,
}: LevelUpModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 80, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-400 p-[2px] shadow-[0_25px_120px_rgba(168,85,247,0.5)]"
          >
            <div className="relative overflow-hidden rounded-[2.4rem] bg-[#1F1147] px-8 py-10 text-center text-white">
              <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-pink-400/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-yellow-300/30 blur-3xl" />

              <motion.div
                initial={{ scale: 0.4, rotate: -20 }}
                animate={{
                  scale: [0.8, 1.2, 1],
                  rotate: [0, 12, -12, 0],
                }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                }}
                className="relative z-10 text-8xl drop-shadow-2xl"
              >
                🏆
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 mt-5 text-5xl font-black tracking-tight text-yellow-300 drop-shadow-lg"
              >
                LEVEL UP
              </motion.h2>

              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
                className="relative z-10 mt-6 inline-flex items-center rounded-full bg-white/10 px-6 py-3 backdrop-blur"
              >
                <span className="text-lg font-black text-white/80">
                  Niveau
                </span>

                <span className="ml-3 text-4xl font-black text-white">
                  {level}
                </span>
              </motion.div>

              <p className="relative z-10 mt-6 text-lg font-bold text-white/80">
                Incroyable progression 🚀
              </p>

              <p className="relative z-10 mt-2 text-sm font-bold text-white/50">
                Continue tes missions pour débloquer encore plus de récompenses.
              </p>

              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={onClose}
                className="relative z-20 mt-8 w-full rounded-3xl bg-gradient-to-r from-yellow-300 to-orange-400 px-6 py-4 text-lg font-black text-purple-900 shadow-2xl"
              >
                ✨ Continuer l’aventure
              </motion.button>

              <motion.div
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="pointer-events-none absolute inset-0 rounded-[2.4rem] border border-white/10"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}