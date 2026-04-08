import { useState, useRef, useCallback, useEffect } from "react";

interface ImageCompareSliderProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPos?: number;
  className?: string;
}

export default function ImageCompareSlider({
  beforeSrc = "",
  afterSrc = "",
  beforeLabel = "Before",
  afterLabel = "After",
  initialPos = 0.5,
  className = "",
}: ImageCompareSliderProps) {
  const [pos, setPos] = useState<number>(initialPos);
  const dragging = useRef<boolean>(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const clamp = (v: number): number => Math.max(0.02, Math.min(0.98, v));

  const applyPos = useCallback((clientX: number): void => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(clamp((clientX - rect.left) / rect.width));
  }, []);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    dragging.current = true;
    applyPos(e.clientX);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent): void => {
      if (dragging.current) applyPos(e.clientX);
    };
    const onUp = (): void => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [applyPos]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    dragging.current = true;
    applyPos(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMove = (e: TouchEvent): void => {
      if (dragging.current) applyPos(e.touches[0].clientX);
    };
    const onEnd = (): void => {
      dragging.current = false;
    };
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [applyPos]);

  const pct = `${(pos * 100).toFixed(2)}%`;
  // clip the right side of the before image: inset(top right bottom left)
  const clipBefore = `inset(0 ${(100 - pos * 100).toFixed(2)}% 0 0)`;

  return (
    <div
      ref={wrapRef}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      className={`relative select-none cursor-ew-resize overflow-hidden rounded-2xl ${className}`}
      style={{ touchAction: "none" }}
    >
      <img
        src={afterSrc}
        alt="after image"
        draggable={false}
        className="block w-full h-full object-cover pointer-events-none"
      />

      <img
        src={beforeSrc}
        alt="before image"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ clipPath: clipBefore }}
      />

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
        style={{ left: pct, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M6 5L2 10L6 15"
              stroke="#374151"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 5L18 10L14 15"
              stroke="#374151"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* uncomment this to get labels on the image slider */}
      {/* <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full pointer-events-none">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full pointer-events-none">
        {afterLabel}
      </span> */}
    </div>
  );
}
