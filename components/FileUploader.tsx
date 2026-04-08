import {
  PROGRESS_INCREMENT,
  PROGRESS_INTERVAL_MS,
  REDIRECT_DELAY_MS,
} from "lib/constants";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useOutletContext } from "react-router";

interface UploadProps {
  onComplete?: (base64Data: string, mimeType: string) => void;
}

export default function FileUploader({ onComplete }: UploadProps) {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState<File | null>(null);

  const [progress, setProgress] = useState(0);

  const { isSignedIn } = useOutletContext<AuthContext>();

  const processFile = useCallback(
    (file: any) => {
      if (!isSignedIn) return;

      setUploaded(file);

      const mimeType = file.type; // e.g. "image/png"

      // ✅ Optional: validate allowed types
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];

      if (!allowedTypes.includes(mimeType)) {
        console.error("Unsupported file type");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result as string;
        onComplete?.(base64Data, mimeType); // call immediately, no interval
        setUploaded(null);
      };

      reader.readAsDataURL(file);
    },
    [isSignedIn, onComplete],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setDragging(false);
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setUploaded(file);

        processFile?.(file);
      }
    },
    [processFile],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setDragging(true),
    onDragLeave: () => setDragging(false),
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative cursor-pointer select-none transition-all duration-500 group
        ${
          isDragActive || dragging
            ? "border-[#C8A96E] bg-[#C8A96E]/5 scale-[1.01]"
            : "border-white/10 hover:border-[#C8A96E]/50 hover:bg-white/[0.02]"
        }
        border-2 border-dashed rounded-2xl p-10 text-center
      `}
    >
      <input {...getInputProps()} />

      {/* Animated corner accents */}
      <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C8A96E] rounded-tl-md opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C8A96E] rounded-tr-md opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C8A96E] rounded-bl-md opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C8A96E] rounded-br-md opacity-60 group-hover:opacity-100 transition-opacity" />

      {uploaded ? (
        <div className="border-2 border-dashed border-[#C8A96E]/40 rounded-2xl p-10 text-center space-y-4">
          <div className="flex justify-center gap-1.5">
            {[0, 0.15, 0.3].map((delay, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-[#C8A96E]"
                style={{
                  animation: `pulse-dot 1s ease-in-out ${delay}s infinite`,
                }}
              />
            ))}
          </div>

          <p className="text-white/60 text-sm">Rendering your 3D space…</p>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C8A96E] rounded-full animate-pulse transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 flex items-center justify-center">
            <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
              <rect
                x="8"
                y="8"
                width="20"
                height="20"
                stroke={isDragActive ? "#C8A96E" : "rgba(255,255,255,0.25)"}
                strokeWidth="1.5"
              />
              <rect
                x="36"
                y="8"
                width="20"
                height="20"
                stroke={isDragActive ? "#C8A96E" : "rgba(255,255,255,0.25)"}
                strokeWidth="1.5"
              />
              <rect
                x="8"
                y="36"
                width="20"
                height="20"
                stroke={isDragActive ? "#C8A96E" : "rgba(255,255,255,0.25)"}
                strokeWidth="1.5"
              />
              <rect
                x="36"
                y="36"
                width="20"
                height="20"
                stroke={isDragActive ? "#C8A96E" : "rgba(255,255,255,0.25)"}
                strokeWidth="1.5"
              />
              <line
                x1="28"
                y1="18"
                x2="36"
                y2="18"
                stroke={isDragActive ? "#C8A96E" : "rgba(255,255,255,0.15)"}
                strokeWidth="1.5"
              />
              <line
                x1="18"
                y1="28"
                x2="18"
                y2="36"
                stroke={isDragActive ? "#C8A96E" : "rgba(255,255,255,0.15)"}
                strokeWidth="1.5"
              />
              <line
                x1="46"
                y1="28"
                x2="46"
                y2="36"
                stroke={isDragActive ? "#C8A96E" : "rgba(255,255,255,0.15)"}
                strokeWidth="1.5"
              />
              <line
                x1="28"
                y1="46"
                x2="36"
                y2="46"
                stroke={isDragActive ? "#C8A96E" : "rgba(255,255,255,0.15)"}
                strokeWidth="1.5"
              />
              {isDragActive && (
                <circle cx="32" cy="32" r="6" fill="#C8A96E" opacity="0.8" />
              )}
            </svg>
          </div>

          <div>
            <p className="text-white text-lg font-semibold mb-1">
              {isDragActive
                ? "Release to transform →"
                : "Drop your floor plan here"}
            </p>
            <p className="text-white/35 text-sm">
              PNG, JPG, SVG · 2D architectural plans only
            </p>
          </div>

          <div className="flex items-center gap-4 justify-center">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-white/25 text-xs uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          <button className="inline-flex items-center gap-2 bg-[#C8A96E] hover:bg-[#d4b87a] text-[#0D0D0D] text-sm font-bold px-6 py-2.5 rounded-full transition-colors duration-200">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Browse Files
          </button>
        </div>
      )}
    </div>
  );
}
