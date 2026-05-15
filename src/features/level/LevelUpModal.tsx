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
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl animate-bounce">
          <div className="text-7xl">🏆</div>
  
          <h2 className="mt-4 text-3xl font-extrabold text-purple-700">
            LEVEL UP !
          </h2>
  
          <p className="mt-3 text-2xl font-bold">
            Niveau {level}
          </p>
  
          <p className="mt-2 text-gray-600">
            Incroyable progression 🚀
          </p>
  
          <button
            onClick={onClose}
            className="mt-6 rounded-2xl bg-purple-600 px-6 py-3 font-bold text-white transition hover:scale-105"
          >
            Continuer
          </button>
        </div>
      </div>
    );
  }