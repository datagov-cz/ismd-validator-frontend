'use client';

import { useEffect, useRef, useState } from 'react';
import type { GovIconProps } from '@gov-design-system-ce/react';

type GovDesignSystemConfig = {
  iconsPath?: string;
};

const getIconsPath = () => {
  const configuredPath = (
    window as typeof window & { GOV_DS_CONFIG?: GovDesignSystemConfig }
  ).GOV_DS_CONFIG?.iconsPath;

  return configuredPath || '/validujeme/assets/icons';
};

/**
 * GOV Design System 4.7.1 loads icons from `/assets/icons` and does not read
 * GOV_DS_CONFIG. This adapter keeps icons working with the application's
 * `/validujeme` base path while preserving the public GovIcon API.
 */
export const GovIcon = ({
  color,
  name,
  type = 'components',
  size,
  className,
  slot,
}: GovIconProps) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setHasError(false);

    if (!name) {
      if (spanRef.current) spanRef.current.innerHTML = '';
      return () => controller.abort();
    }

    const iconUrl = `${getIconsPath()}/${type}/${name}.svg`;

    void fetch(iconUrl, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Icon not found: ${iconUrl}`);
        return response.text();
      })
      .then((svg) => {
        const document = new DOMParser().parseFromString(svg, 'image/svg+xml');
        const isValidSvg =
          document.documentElement.tagName.toLowerCase() === 'svg';

        if (!isValidSvg) throw new Error(`Invalid SVG: ${iconUrl}`);
        if (spanRef.current) spanRef.current.innerHTML = svg;
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError')
          return;
        if (spanRef.current) spanRef.current.innerHTML = '';
        setHasError(true);
      });

    return () => controller.abort();
  }, [name, type]);

  if (hasError) return null;

  return (
    <span
      ref={spanRef}
      className={`gov-icon${className ? ` ${className}` : ''}`}
      slot={slot}
      data-size={size}
      color={color}
    />
  );
};
