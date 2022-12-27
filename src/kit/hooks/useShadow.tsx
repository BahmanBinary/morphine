import { CSSProperties, useEffect, useRef } from "react";
import {
  ElementProperties,
  ElementShape,
  ElevationLevel,
  LightIntensity,
  LightSource,
  ShadowProperties,
} from "../types/hooks/useShadow";
import chroma from "chroma-js";

const transparentValues: CSSProperties["backgroundColor"][] = [
  "transparent",
  "rgba(0,0,0,0)",
  "#00000000",
];

export function useShadow(
  level: ElevationLevel = 1,
  shape: ElementShape = "convex"
) {
  const elementRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    const element = elementRef.current;
    const size = Math.round(
      Math.max(element.offsetWidth, element.offsetHeight)
    );

    const shadowProperties = getShadowProperties(level, size);
    const contextBackgroundColor = getBackgroundColor(element);

    const properties: ElementProperties = {
      contextBackgroundColor,
      shadowProperties,
      shape,
    };

    setStyle(element, properties);
  }, [level, shape]);

  return elementRef;
}

function getShadowProperties(level: number, size: number) {
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

function getBackgroundColor(element: HTMLElement) {
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

function setStyle(element: HTMLElement, properties: ElementProperties) {
  const lightIntensity: LightIntensity = document.documentElement.dataset
    .lightIntensity
    ? (Number(
        document.documentElement.dataset.lightIntensity
      ) as LightIntensity)
    : 1;

  const shadowProperties = properties.shadowProperties;

  const intensityValue = Number(
    ((1 + (lightIntensity - 1) * 0.25) * 0.67).toFixed(2)
  );

  const elementBackgroundColor = getComputedStyle(element).backgroundColor;

  const insetAttribute = properties.shape === "pressed" ? "inset " : "";
  const shadowBaseColor =
    properties.shape === "pressed"
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

  if (["concave", "convex"].includes(properties.shape)) {
    const shape = properties.shape;

    const backgroundBaseColor = transparentValues.includes(
      elementBackgroundColor
    )
      ? properties.contextBackgroundColor
      : elementBackgroundColor;

    const backgroundDarkColor =
      chroma(backgroundBaseColor).darken(intensityValue);
    const backgroundLightColor =
      chroma(backgroundBaseColor).brighten(intensityValue);

    element.style.background = `linear-gradient(${shadowProperties.angle}deg,${
      shape === "concave" ? backgroundDarkColor : backgroundLightColor
    },${shape === "concave" ? backgroundLightColor : backgroundDarkColor})`;
  }

  element.style.boxShadow = `${darkShadow},${lightShadow}`;
}
