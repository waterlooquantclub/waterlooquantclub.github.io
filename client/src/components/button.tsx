import React, { type ReactNode } from "react";
import clsx from "clsx";

type ButtonProps<T extends React.ElementType> = {
  as?: T;
  filled?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Button<T extends React.ElementType = "button">({
  as,
  filled = false,
  className,
  children,
  ...props
}: ButtonProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>) {
  const Component = as ?? "button";
  return (
    <Component
      className={clsx(
        "px-12 py-2 rounded-full transition-colors font-inter",
        filled
          ? "bg-white text-black hover:bg-[#9770D6] shadow-[0_0_12px_#ffffffBF]"
          : "border border-white text-accent hover:bg-white/20 hover:backdrop-blur-sm shadow-[0_0_12px_#ffffffBF]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
