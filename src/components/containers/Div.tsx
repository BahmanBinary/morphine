export default function Div({
  className,
  ...props
}: JSX.IntrinsicElements["div"]) {
  return (
    <div
      className={`container ${className ?? ""}`}
      data-author="morphine"
      {...props}
    />
  );
}
