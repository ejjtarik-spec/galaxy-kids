"use client";

import { motion } from "framer-motion";

type GameButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
};

export default function GameButton({
  children,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: GameButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{
        scale: 0.94,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 18,
      }}
      className={`
        relative
        overflow-hidden
        rounded-2xl
        px-5
        py-3
        font-black
        text-white
        shadow-[0_12px_35px_rgba(0,0,0,0.35)]
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      <motion.div
        animate={{
          x: ["-120%", "120%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          pointer-events-none
          absolute
          inset-y-0
          w-1/3
          bg-white/20
          blur-xl
        "
      />

      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
}