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
  return (
    <button
      className={
        `elevation-p-1--top-left round-1 ${size} ${buttonType} ` + className
      }
      {...props}
    >
      {children}
    </button>
  );
}
