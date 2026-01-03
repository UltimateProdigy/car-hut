import React from "react";

import logoIcon from "@/assets/icons/logo.svg";

const iconRegistry = {
  logo: logoIcon,
};

type IconName = keyof typeof iconRegistry;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
}

export function Icon({
  name,
  size = 24,
  className = "",
  style = {},
  alt,
}: IconProps) {
  const source = iconRegistry[name];

  if (!source) {
    console.warn(
      `Icon "${name}" not found. Available icons:`,
      Object.keys(iconRegistry)
    );
    return null;
  }

  return (
    <img
      src={source}
      alt={alt || name}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        ...style,
      }}
    />
  );
}
