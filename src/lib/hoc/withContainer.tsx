type Component<P> = {
  (props: P): JSX.Element;
  displayName?: string;
};

export default function withContainer<P extends { className?: string }>(
  Component: Component<P>,
  displayName = Component.displayName ?? Component.name
) {
  return function ({ className, ...props }: P) {
    return (
      <Component
        className={`container ${className ?? ""}`}
        data-author="morphine"
        {...props}
      />
    );
  };
}
