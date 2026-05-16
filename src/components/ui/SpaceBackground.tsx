"use client";

import { motion } from "framer-motion";

export default function SpaceBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#120A2A] via-[#241052] to-[#3B155F]">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-pink-500/25 blur-3xl" />
      <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-purple-500/25 blur-3xl" />

      {Array.from({ length: 60 }).map((_, index) => (
        <motion.div
          key={index}
          animate={{
            opacity: [0.15, 0.9, 0.15],
            scale: [0.7, 1.4, 0.7],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 2 + (index % 5),
            repeat: Infinity,
            delay: index * 0.07,
          }}
          className="absolute text-white/50"
          style={{
            left: `${(index * 23) % 100}%`,
            top: `${(index * 41) % 100}%`,
          }}
        >
          ✦
        </motion.div>
      ))}

      {Array.from({ length: 18 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          animate={{
            y: [0, -80, 0],
            x: [0, index % 2 === 0 ? 18 : -18, 0],
            opacity: [0.1, 0.45, 0.1],
          }}
          transition={{
            duration: 6 + (index % 4),
            repeat: Infinity,
            delay: index * 0.3,
          }}
          className="absolute h-2 w-2 rounded-full bg-white/40 blur-[1px]"
          style={{
            left: `${(index * 31) % 100}%`,
            top: `${(index * 19) % 100}%`,
          }}
        />
      ))}
    </div>
  );
}