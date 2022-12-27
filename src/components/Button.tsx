import { RefObject } from "react";
import { useShadow } from "../kit/hooks/useShadow";

type HTMLButtonType = JSX.IntrinsicElements["button"];
interface ButtonType extends HTMLButtonType {
  size?: "sm" | "md" | "lg";
  buttonType?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info";
}

export function Button({
  children,
  className,
  size = "md",
  buttonType = "secondary",
  ...props
}: ButtonType): JSX.Element {
  const buttonRef = useShadow() as RefObject<HTMLButtonElement>;

  return (
    <button
      ref={buttonRef}
      className={
        `round-1 ${size} ${buttonType} ` +
        (className ?? "")
      }
      {...props}
    >
      {children}
    </button>
  );
}
