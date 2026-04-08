export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "rgba(13, 13, 13, 0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Animated floor plan icon */}
      <div className="relative mb-8">
        {/* Outer rotating ring */}
        <svg
          className="animate-spin"
          style={{ animationDuration: "3s" }}
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
        >
          <circle
            cx="40"
            cy="40"
            r="36"
            stroke="#C8A96E"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
          <path
            d="M40 4 A36 36 0 0 1 76 40"
            stroke="#C8A96E"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Center floor plan grid */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect
              x="2"
              y="2"
              width="14"
              height="14"
              stroke="#C8A96E"
              strokeWidth="1"
              strokeOpacity="0.8"
            />
            <rect
              x="20"
              y="2"
              width="14"
              height="14"
              stroke="#C8A96E"
              strokeWidth="1"
              strokeOpacity="0.8"
            />
            <rect
              x="2"
              y="20"
              width="14"
              height="14"
              stroke="#C8A96E"
              strokeWidth="1"
              strokeOpacity="0.8"
            />
            <rect
              x="20"
              y="20"
              width="14"
              height="14"
              stroke="#C8A96E"
              strokeWidth="1"
              strokeOpacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Text */}
      <h2
        className="text-white text-2xl font-bold mb-2 tracking-tight"
        style={{ fontFamily: "'Fraunces', Georgia, serif" }}
      >
        Generating your render
      </h2>
      <p className="text-white/40 text-sm mb-8 tracking-wide">
        AI is transforming your 2D plan into 3D — please wait
      </p>

      {/* Animated dots progress */}
      <div className="flex items-center gap-2">
        {[0, 0.2, 0.4].map((delay, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#C8A96E]"
            style={{
              animation: `pulse 1.2s ease-in-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Thin animated progress bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
        <div
          className="h-full bg-[#C8A96E]"
          style={{
            animation: "progress 2.5s ease-in-out infinite",
            transformOrigin: "left",
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(0.7); }
        }
        @keyframes progress {
          0%   { width: 0%; opacity: 1; }
          80%  { width: 90%; opacity: 1; }
          100% { width: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
