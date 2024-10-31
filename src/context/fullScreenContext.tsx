import React, { createContext, useState, useRef } from "react";

export type FullscreenContextType = {
  isFullscreen: boolean;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  toggleFullscreen: () => void;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FullscreenContext = createContext<FullscreenContextType>({
  isFullscreen: false,
  containerRef: { current: null },
  toggleFullscreen: () => {},
  setIsFullscreen: () => {},
});

export const FullscreenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <FullscreenContext.Provider
      value={{ isFullscreen, containerRef, toggleFullscreen, setIsFullscreen }}
    >
      {children}
    </FullscreenContext.Provider>
  );
};
