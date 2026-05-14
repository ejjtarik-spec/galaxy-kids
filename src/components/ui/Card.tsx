type CardProps = {
    children: React.ReactNode;
  };
  
  export default function Card({ children }: CardProps) {
    return (
      <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
        {children}
      </div>
    );
  }