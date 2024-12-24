type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`overflow-hidden rounded-lg bg-white shadow ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-200 px-4 py-5 sm:px-6">{children}</div>
  );
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-5 sm:p-6">{children}</div>;
}
