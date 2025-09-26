import React, { type ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
    filled?: Boolean;
    className?: string;
    children?: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  filled = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "px-12 py-2 rounded-full transition-colors transition-colors font-roboto",
        filled
          ? "bg-white text-black hover:bg-[#9770D6] shadow-[0_0_12px_#ffffffBF]"
          : "border border-white text-accent hover:bg-white/20 hover:backdrop-blur-sm shadow-[0_0_12px_#ffffffBF]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};