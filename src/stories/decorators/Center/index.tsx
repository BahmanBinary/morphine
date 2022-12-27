import style from "./Center.module.scss";

type HTMLDiv = JSX.IntrinsicElements["div"];

export default function Center({ className, children, ...props }: HTMLDiv) {
  return (
    <div className={`${style.container} ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
}
