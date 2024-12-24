type ButtonProps = {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Update this line
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
};

const variants = {
  primary: "bg-indigo-600 text-white hover:bg-indigo-500",
  secondary: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2",
  lg: "px-4 py-2 text-lg",
};

export function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center rounded-md font-semibold
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
