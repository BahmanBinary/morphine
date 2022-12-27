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

export interface ElementProperties {
  shadowProperties: ShadowProperties;
  shape: ElementShape;
  contextBackgroundColor: string;
}
