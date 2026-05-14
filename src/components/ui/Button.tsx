type ButtonProps = {
    children: React.ReactNode;
  };
  
  export default function Button({ children }: ButtonProps) {
    return (
      <button className="bg-purple-500 text-white px-4 py-2 rounded-xl">
        {children}
      </button>
    );
  }