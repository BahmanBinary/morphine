import React, { createRef } from "react";

export default function withShadow<P extends {}>(
  Component: { (props: P): JSX.Element; displayName?: string },
  displayName = Component.displayName ?? Component.name
) {
  return class extends React.Component<P> {
    public static displayName = displayName;
    private shadowContainer = createRef<HTMLDivElement>();

    componentDidMount() {
      const container = this.shadowContainer.current?.closest(
        ".container[data-author='morphine']"
      );

      console.log(container);
      if (container) return;
    }

    public render() {
      const { ...props } = this.props;

      return (
        <div ref={this.shadowContainer}>
          <Component {...props} />
        </div>
      );
    }
  };
}
