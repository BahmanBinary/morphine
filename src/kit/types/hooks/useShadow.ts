import { CSSProperties } from "react";

export type LightSource =
  | "top-left"
  | "top-right"
  | "bottom-right"
  | "bottom-left";

export interface ShadowProperties {
  xDirection: number;
  yDirection: number;
  blur: number;
  angle: number;
}

export type ElevationLevel = 1 | 2 | 3 | 4 | 5;

export type LightIntensity = 1 | 2 | 3 | 4 | 5;

export type ElementShape = "flat" | "concave" | "convex" | "pressed";

export type ElementShapeWithGradient = Exclude<
  ElementShape,
  "flat" | "pressed"
>;

export interface ElementProperties {
  contextBackgroundColor: NonNullable<CSSProperties["backgroundColor"]>;
  elementBackgroundColor: NonNullable<CSSProperties["backgroundColor"]>;
  shadowProperties: ShadowProperties;
  shape: ElementShape;
}

export type ShapeStyles = {
  [key in ElementShape]: {
    backgroundColor?: CSSProperties["backgroundColor"];
    boxShadow: CSSProperties["boxShadow"];
  };
};
