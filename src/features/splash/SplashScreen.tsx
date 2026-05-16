"use client";

import { motion } from "framer-motion";

type SplashScreenProps = {
  visible: boolean;
};

export default function SplashScreen({
  visible,
}: SplashScreenProps) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="
        fixed
        inset-0
        z-[999]
        overflow-hidden
        bg-[#070B1A]
      "
    >
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 45 }).map((_, index) => (
          <motion.div
            key={index}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.5, 0.8],
            }}
            transition={{
              duration: 1.5 + (index % 4),
              repeat: Infinity,
              delay: index * 0.08,
            }}
            className="absolute text-white/60"
            style={{
              left: `${(index * 17) % 100}%`,
              top: `${(index * 29) % 100}%`,
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          animate={{
            y: [0, -16, 0],
            rotate: [0, 6, -6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          className="
            flex
            h-40
            w-40
            items-center
            justify-center
            rounded-[3rem]
            bg-gradient-to-br
            from-fuchsia-500
            via-purple-600
            to-cyan-500
            text-8xl
            shadow-[0_0_120px_rgba(168,85,247,0.55)]
          "
        >
          🚀
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.7,
          }}
          className="
            mt-10
            bg-gradient-to-r
            from-yellow-300
            via-pink-400
            to-cyan-300
            bg-clip-text
            text-6xl
            font-black
            text-transparent
          "
        >
          Galaxy Kids
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
          }}
          className="
            mt-4
            max-w-sm
            text-lg
            font-bold
            text-white/70
          "
        >
          Transforme les missions quotidiennes
          en aventure galactique ✨
        </motion.p>

        <div className="mt-12 flex items-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="h-4 w-4 rounded-full bg-pink-400"
          />

          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.2,
            }}
            className="h-4 w-4 rounded-full bg-yellow-300"
          />

          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: 0.4,
            }}
            className="h-4 w-4 rounded-full bg-cyan-400"
          />
        </div>
      </div>
    </motion.div>
  );
}