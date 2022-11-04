export default function Address({
  className,
  ...props
}: JSX.IntrinsicElements["address"]) {
  return (
    <address
      className={`container ${className ?? ""}`}
      data-author="morphine"
      {...props}
    />
  );
}
