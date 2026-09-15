import { ComponentPropsWithoutRef } from "react";

type ExternalLinkProps = ComponentPropsWithoutRef<"a">;

const ExternalLink = ({
  children,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: ExternalLinkProps) => (
  <a target={target} rel={rel} {...props}>
    {children}
  </a>
);

export default ExternalLink;
