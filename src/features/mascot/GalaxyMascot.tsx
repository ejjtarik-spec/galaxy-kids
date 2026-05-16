"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type GalaxyMascotProps = {
  message?: string;
};

export default function GalaxyMascot({
  message = "Prêt pour une mission galactique ?",
}: GalaxyMascotProps) {
  return (
    <div className="pointer-events-none fixed bottom-28 left-4 z-40 max-w-[190px]">
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="relative"
      >
        <div className="rounded-[2rem] border border-cyan-300/20 bg-[#14072F]/90 p-3 text-center shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="relative mx-auto h-[110px] w-[110px]">
            <Image
              src="/mascot/galaxy-bot.png"
              alt="Galaxy Mascot"
              fill
              className="object-contain drop-shadow-[0_0_25px_rgba(103,232,249,0.55)]"
              priority
            />
          </div>

          <p className="mt-2 text-xs font-black leading-snug text-white">
            {message}
          </p>
        </div>

        <div className="pointer-events-none absolute -inset-3 rounded-[2.5rem] bg-cyan-400/20 blur-2xl" />
      </motion.div>
    </div>
  );
}