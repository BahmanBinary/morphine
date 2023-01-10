import { CSSProperties, useCallback, useEffect, useRef } from "react";
import {
  ElementProperties,
  ElementShape,
  ElementShapeWithGradient,
  ElevationLevel,
  LightIntensity,
  LightSource,
  ShadowProperties,
  ShapeStyles,
} from "../types/hooks/useShadow";
import chroma from "chroma-js";

const transparentValues: CSSProperties["backgroundColor"][] = [
  "transparent",
  "rgba(0,0,0,0)",
  "#00000000",
];

export function useShadow(shape: ElementShape = "flat") {
  const elementRef = useRef<HTMLElement>(null!);
  const shapeStyles = useRef<Partial<ShapeStyles> | null>(null);

  const setStyle = useCallback((element: HTMLElement, shape: ElementShape) => {
    const size = Math.round(
      Math.max(element.offsetWidth, element.offsetHeight)
    );

    const shadowProperties = getShadowProperties(size);
    const contextBackgroundColor = getContextBackgroundColor(element);

    const properties: ElementProperties = {
      contextBackgroundColor,
      elementBackgroundColor: getComputedStyle(element).backgroundColor,
      shadowProperties,
      shape,
    };

    shapeStyles.current = getShapeStyles(properties);
  }, []);

  useEffect(() => {
    const element = elementRef.current;

    setStyle(element, shape);
  }, [shape]);

  return elementRef;
}

function getShadowProperties(size: number) {
  const level = getElevationLevel();
  const lightSource =
    (document.documentElement.dataset.lightSource as LightSource) ?? "top-left";

  const shadowOffsetBySize = Math.round(0.075 * size);
  const shadowOffset =
    shadowOffsetBySize + Math.round((level - 1) * 0.1 * shadowOffsetBySize);
  const blur = 2 * shadowOffset;

  const shadowProperties: ShadowProperties = {
    xDirection: shadowOffset,
    yDirection: shadowOffset,
    blur,
    angle: 135,
  };

  switch (lightSource) {
    case "top-right":
      shadowProperties.xDirection *= -1;
      shadowProperties.angle = 225;

      break;

    case "bottom-right":
      shadowProperties.xDirection *= -1;
      shadowProperties.yDirection *= -1;
      shadowProperties.angle = 315;

      break;

    case "bottom-left":
      shadowProperties.yDirection *= -1;
      shadowProperties.angle = 45;

      break;
  }

  return shadowProperties;
}

function getContextBackgroundColor(element: HTMLElement) {
  let parentElement = element.parentElement;

  while (parentElement) {
    const backgroundColor = getComputedStyle(
      parentElement
    ).backgroundColor.replaceAll(" ", "");

    if (!transparentValues.includes(backgroundColor)) return backgroundColor;

    parentElement = parentElement?.parentElement;
  }

  return "#FFF";
}

function getShapeStyles(properties: ElementProperties) {
  const styles: Partial<ShapeStyles> = {};

  const shapes: ElementShape[] = ["concave", "convex", "flat", "pressed"];

  for (const shape of shapes)
    styles[shape] = {
      boxShadow: getShapeShadowStyle(shape, properties),
      ...(!["concave", "convex"].includes(shape)
        ? {
            backgroundColor: getShapeBackgroundStyle(
              shape as ElementShapeWithGradient,
              properties
            ),
          }
        : {}),
    };

  return styles;
}

function getShapeShadowStyle(
  shape: ElementShape,
  properties: ElementProperties
) {
  const shadowProperties = properties.shadowProperties;
  const elementBackgroundColor = properties.elementBackgroundColor;
  const intensityValue = getLightIntensityValue();

  const insetAttribute = shape === "pressed" ? "inset " : "";
  const shadowBaseColor =
    shape === "pressed"
      ? transparentValues.includes(elementBackgroundColor)
        ? properties.contextBackgroundColor
        : elementBackgroundColor
      : properties.contextBackgroundColor;

  const shadowDarkColor = chroma(shadowBaseColor).darken(intensityValue);
  const shadowLightColor = chroma(shadowBaseColor).brighten(intensityValue);

  const darkShadow =
    insetAttribute +
    `${shadowProperties.xDirection}px ${shadowProperties.yDirection}px ${shadowProperties.blur}px ${shadowDarkColor}`;
  const lightShadow =
    insetAttribute +
    `${-shadowProperties.xDirection}px ${-shadowProperties.yDirection}px ${
      shadowProperties.blur
    }px ${shadowLightColor}`;

  return `${darkShadow},${lightShadow}`;
}

function getShapeBackgroundStyle(
  shape: ElementShapeWithGradient,
  properties: ElementProperties
) {
  const elementBackgroundColor = properties.elementBackgroundColor;

  const intensityValue = getLightIntensityValue();

  const backgroundBaseColor = transparentValues.includes(elementBackgroundColor)
    ? properties.contextBackgroundColor
    : elementBackgroundColor;

  const backgroundDarkColor =
    chroma(backgroundBaseColor).darken(intensityValue);
  const backgroundLightColor =
    chroma(backgroundBaseColor).brighten(intensityValue);

  return `linear-gradient(${properties.shadowProperties.angle}deg,${
    shape === "concave" ? backgroundDarkColor : backgroundLightColor
  },${shape === "concave" ? backgroundLightColor : backgroundDarkColor})`;
}

function getElevationLevel(): ElevationLevel {
  return document.documentElement.dataset.elevationLevel
    ? (Number(
        document.documentElement.dataset.elevationLevel
      ) as ElevationLevel)
    : 1;
}

function getLightIntensityValue() {
  const lightIntensityLevel = document.documentElement.dataset.lightIntensity
    ? (Number(
        document.documentElement.dataset.lightIntensity
      ) as LightIntensity)
    : 1;

  return Number(((1 + (lightIntensityLevel - 1) * 0.25) * 0.67).toFixed(2));
}
