"use client";

import { AnimatePresence, motion } from "framer-motion";

type FloatingRewardProps = {
  xp: number;
  coins: number;
  visible: boolean;
};

export default function FloatingReward({
  xp,
  coins,
  visible,
}: FloatingRewardProps) {
  return (
    <AnimatePresence>
      {visible && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.6,
              y: 40,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: -80,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: -140,
              filter: "blur(6px)",
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              rounded-[32px]
              border border-white/40
              bg-gradient-to-br
              from-purple-500
              via-pink-500
              to-yellow-400
              px-10
              py-6
              shadow-[0_20px_80px_rgba(168,85,247,0.45)]
              backdrop-blur-xl
            "
          >
            <div className="absolute inset-0 rounded-[32px] bg-white/10" />

            <div className="relative flex flex-col items-center">
              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                }}
                className="
                  text-4xl
                  font-black
                  tracking-wide
                  text-white
                  drop-shadow-lg
                "
              >
                +{xp} XP ⭐
              </motion.p>

              <motion.p
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                }}
                className="
                  mt-3
                  text-3xl
                  font-extrabold
                  text-yellow-100
                  drop-shadow-lg
                "
              >
                +{coins} 🪙
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
              className="
                absolute
                -inset-2
                rounded-[36px]
                bg-white/20
                blur-2xl
              "
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}