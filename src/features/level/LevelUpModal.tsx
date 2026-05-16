"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  useEffect(() => {
    if (!open) return;

    const timeout = setTimeout(() => {
      onClose();
    }, 2600);

    return () => clearTimeout(timeout);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
        >
          <motion.div
            initial={{
              scale: 0.7,
              opacity: 0,
              y: 40,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 180,
              damping: 14,
            }}
            className="
              relative
              w-full
              max-w-sm
              overflow-hidden
              rounded-[2.5rem]
              bg-gradient-to-br
              from-yellow-300
              via-orange-400
              to-pink-500
              p-[2px]
              shadow-[0_0_120px_rgba(250,204,21,0.45)]
            "
          >
            <div className="relative rounded-[2.4rem] bg-[#1E163A] p-8 text-center text-white">
              <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-pink-500/20 blur-3xl" />
              <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-yellow-300/20 blur-3xl" />

              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="relative z-10 text-8xl"
              >
                🏆
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="
                  mt-5
                  bg-gradient-to-r
                  from-yellow-300
                  via-pink-400
                  to-cyan-300
                  bg-clip-text
                  text-4xl
                  font-black
                  text-transparent
                "
              >
                LEVEL UP !
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-3xl font-black"
              >
                Niveau {level}
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-3 text-sm font-bold text-white/70"
              >
                Incroyable progression cosmique 🚀
              </motion.p>

              <div className="mt-8 flex justify-center gap-3">
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="h-3 w-3 rounded-full bg-pink-400"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.2,
                  }}
                  className="h-3 w-3 rounded-full bg-yellow-300"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                  className="h-3 w-3 rounded-full bg-cyan-300"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}