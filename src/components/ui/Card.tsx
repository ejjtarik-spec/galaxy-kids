type CardProps = {
  children: React.ReactNode;
};

export default function Card({
  children,
}: CardProps) {
  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[2.5rem]
        border
        border-white/10
        bg-white/10
        p-4
        shadow-[0_20px_80px_rgba(0,0,0,0.35)]
        backdrop-blur-2xl
      "
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />

      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-pink-400/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}