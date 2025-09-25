import React, { type ElementType, type ReactNode } from "react";
import clsx from "clsx";

type TextSize = "sm" | "md" | "lg" | "xl";
type TextFont = "roboto" | "lato" | "krona";
type TextColor = "white" | "accent";

interface TextProps extends React.HtmlHTMLAttributes<HTMLParagraphElement> {
    size?: TextSize;
    font?: TextFont;
    className?: string;
    color?: TextColor;
    as?: ElementType;
    children?: ReactNode;
}

const sizeMap: Record<TextSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const colorMap: Record<TextColor, string> = {
  white: "text-white",
  accent: "text-[#9770D6]",
};

const fontMap: Record<TextFont, string> = {
  roboto: "font-roboto",
  lato: "font-lato",
  krona: "font-krona",
};

export const Text: React.FC<TextProps> = ({
  size = "md",
  font = "roboto",
  color = "white",
  className,
  as: Component = "p",
  children,
  ...props
}) => {
  return (
    <Component className={clsx(sizeMap[size as keyof typeof sizeMap], fontMap[font as keyof typeof fontMap], colorMap[color as keyof typeof colorMap], className)} {...props}>
      {children}
    </Component>
  );
};
