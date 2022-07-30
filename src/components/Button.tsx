type ButtonType = JSX.IntrinsicElements["button"];
interface AppBodyProps extends ButtonType {
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
}: AppBodyProps): JSX.Element {
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
