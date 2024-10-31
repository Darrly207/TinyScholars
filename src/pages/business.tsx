import React, { useState, useRef } from "react";

const Business = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Vào chế độ toàn màn hình
      videoContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      // Thoát chế độ toàn màn hình
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        ref={videoContainerRef}
        className="relative bg-black rounded-lg overflow-hidden"
      >
        <video
          ref={videoRef}
          className="w-full h-auto"
          controls
          src="/api/placeholder/640/360"
        />

        <div className="absolute bottom-0 right-0 p-4">
          <button
            onClick={handleFullscreen}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg"
          >
            {isFullscreen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20h6M4 16V4h16v12H4z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4h4M4 16v4h4M20 8V4h-4M20 16v4h-4"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Business;
