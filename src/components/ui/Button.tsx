type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-2xl transition"
    >
      {children}
    </button>
  );
}