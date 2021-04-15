import { useState, useMemo, useCallback } from "react";
import { createContainer } from "unstated-next";

import { ThemeConfig } from "scripts/utils";

const useThemeHook = () => {
  const [theme, setTheme] = useState<ThemeConfig>();
  const bgColor = useMemo(() => theme?.bg ?? "#ffffff", [theme]);
  const textColor = useMemo(() => theme?.text ?? "#2D3748", [theme]);
  const borderColor = useMemo(() => theme?.border ?? "#CBD5E0", [theme]);
  const linkColor = useMemo(() => theme?.link ?? "#0fa7dc", [theme]);
  const buttonColor = useMemo(() => theme?.button ?? "#0fa7dc", [theme]);

  return {
    setTheme,
    bgColor,
    textColor,
    borderColor,
    linkColor,
    buttonColor,
  };
};

const Container = createContainer(useThemeHook);

export const useEmbedTheme = Container.useContainer;

export const EmbedThemeProvider = Container.Provider;

export default Container;
