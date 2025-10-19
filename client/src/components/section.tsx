import { Text } from "./text";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  title: string;
  children?: ReactNode;
  className?: string;
  titleFont?: "lato" | "krona";
}

function Section({ id, title, children, className = "", titleFont = "lato" }: SectionProps) {
  return (
    <section className={`w-screen min-h-screen ${className}`} id={id}>
      <Text
        font={titleFont}
        className="font-bold sm:text-[36px] text-[28px] sm:mb-10 mb-8 text-center"
      >
        {title}
      </Text>
      {children}
    </section>
  );
}

export default Section;
