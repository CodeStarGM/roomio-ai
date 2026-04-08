import { useState } from "react";
import FileUploader from "../../components/FileUploader";
import Navbar from "../../components/Navbar";
import puter from "@heyputer/puter.js";
import {
  ROOMIFY_3D_TILTED_RENDER_PROMPT,
  ROOMIFY_RENDER_PROMPT,
} from "../../lib/constants";
import Footer from "components/Footer";
import ResultCard from "components/ResultCard";
import ImageCompareSlider from "components/ImageCompareSlider";
import Loading from "components/Loading";
import DownloadButton from "components/DownloadButton";
import { useOutletContext } from "react-router";
import type { MetaFunction } from "react-router";

let callCount = 0;

export const meta: MetaFunction = () => {
  return [
    { title: "Roomio AI — Beautiful Floor Plan Renders" },
    {
      name: "description",
      content:
        "Upload a bare 2D floor plan and Roomio AI transforms it into a beautifully furnished, visualized plan — in seconds.",
    },
  ];
};

export default function RoomioLanding() {
  const [processing, setProcessing] = useState(false);
  const [aiImage, setAiImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");

  const { isSignedIn, signIn } = useOutletContext<AuthContext>();

  const generateImageFromAi = async (base: string, mimeType: string) => {
    if (callCount === 1) return;
    callCount++;
    console.log("🔥 API CALL COUNT:", callCount);

    try {
      setProcessing(true);

      if (!mimeType || !base) throw new Error("Invalid source image payload");

      console.log("🚀 Sending request...");

      const response = await puter.ai.txt2img(ROOMIFY_RENDER_PROMPT, {
        provider: "gemini",
        model: "gemini-2.5-flash-image-preview",
        input_image: base,
        input_image_mime_type: mimeType,
        ratio: { w: 1024, h: 1024 },
      });

      const imageUrl = response?.src ?? null;
      setAiImage(imageUrl);
    } catch (err) {
      console.error("Error transforming image:", err);
    } finally {
      setProcessing(false);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleOnComplete = (base: string, mimeType: string) => {
    setUploadedImage(base);

    generateImageFromAi(base, mimeType);
  };

  const handleAuthClick = async () => {
    try {
      await signIn();
    } catch (error) {
      console.log(error, "signin failed");
    }
  };

  return (
    <>
      {processing && <Loading />}
      <div
        className="min-h-screen bg-[#0D0D0D] text-white font-sans"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="noise-overlay fixed inset-0 z-0 pointer-events-none" />

        <Navbar />

        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
          <div className="grid-bg absolute inset-0" />
          <div className="hero-glow absolute inset-0" />

          <div className="float-anim absolute right-[5%] top-[18%] opacity-[0.07] hidden xl:block">
            <svg width="260" height="220" viewBox="0 0 260 220" fill="none">
              <rect
                x="10"
                y="10"
                width="100"
                height="80"
                stroke="#C8A96E"
                strokeWidth="1"
              />
              <rect
                x="110"
                y="10"
                width="140"
                height="80"
                stroke="#C8A96E"
                strokeWidth="1"
              />
              <rect
                x="10"
                y="90"
                width="60"
                height="120"
                stroke="#C8A96E"
                strokeWidth="1"
              />
              <rect
                x="70"
                y="90"
                width="180"
                height="120"
                stroke="#C8A96E"
                strokeWidth="1"
              />
              <line
                x1="70"
                y1="10"
                x2="70"
                y2="90"
                stroke="#C8A96E"
                strokeWidth="0.5"
              />
              <line
                x1="10"
                y1="150"
                x2="70"
                y2="150"
                stroke="#C8A96E"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              <line
                x1="110"
                y1="90"
                x2="110"
                y2="210"
                stroke="#C8A96E"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
          <div
            className="float-anim absolute left-[4%] bottom-[22%] opacity-[0.05] hidden xl:block"
            style={{ animationDelay: "2s" }}
          >
            <svg width="180" height="160" viewBox="0 0 180 160" fill="none">
              <rect
                x="5"
                y="5"
                width="170"
                height="60"
                stroke="#C8A96E"
                strokeWidth="1"
              />
              <rect
                x="5"
                y="65"
                width="80"
                height="90"
                stroke="#C8A96E"
                strokeWidth="1"
              />
              <rect
                x="85"
                y="65"
                width="90"
                height="90"
                stroke="#C8A96E"
                strokeWidth="1"
              />
              <line
                x1="85"
                y1="65"
                x2="85"
                y2="155"
                stroke="#C8A96E"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl w-full mx-auto text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#C8A96E]/10 border border-[#C8A96E]/20 rounded-full px-4 py-1.5 mb-2">
              <span className="processing-dot w-1.5 h-1.5 rounded-full bg-[#C8A96E] inline-block" />
              <span className="text-[#C8A96E] text-xs font-semibold tracking-widest uppercase">
                AI-Powered · Floor Plan Visualizer
              </span>
            </div>

            {/* Headline */}
            <h1 className="display-font text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white">
              See your floor plan,
              <br />
              <em className="not-italic text-[#C8A96E]">
                beautifully rendered.
              </em>
            </h1>

            {/* Sub */}
            <p className="text-white/40 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light">
              Upload a bare 2D floor plan the kind with just lines and room
              labels and Roomio fills it with furniture, materials, and depth.
              Same layout, stunning result.
            </p>

            {/* Dropzone */}
            <div className="mt-4 w-full max-w-xl mx-auto">
              {isSignedIn ? (
                <FileUploader onComplete={handleOnComplete} />
              ) : (
                <div className="relative cursor-default border-2 border-dashed border-white/10 rounded-2xl p-10 text-center">
                  {/* Corner accents */}
                  <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C8A96E] rounded-tl-md opacity-60" />
                  <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C8A96E] rounded-tr-md opacity-60" />
                  <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C8A96E] rounded-bl-md opacity-60" />
                  <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C8A96E] rounded-br-md opacity-60" />

                  <div className="space-y-5">
                    {/* Same icon but locked */}
                    <div className="mx-auto w-16 h-16 flex items-center justify-center opacity-30">
                      <svg
                        viewBox="0 0 64 64"
                        fill="none"
                        className="w-full h-full"
                      >
                        <rect
                          x="8"
                          y="8"
                          width="20"
                          height="20"
                          stroke="rgba(255,255,255,0.25)"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="36"
                          y="8"
                          width="20"
                          height="20"
                          stroke="rgba(255,255,255,0.25)"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="8"
                          y="36"
                          width="20"
                          height="20"
                          stroke="rgba(255,255,255,0.25)"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="36"
                          y="36"
                          width="20"
                          height="20"
                          stroke="rgba(255,255,255,0.25)"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="28"
                          y1="18"
                          x2="36"
                          y2="18"
                          stroke="rgba(255,255,255,0.15)"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="18"
                          y1="28"
                          x2="18"
                          y2="36"
                          stroke="rgba(255,255,255,0.15)"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="46"
                          y1="28"
                          x2="46"
                          y2="36"
                          stroke="rgba(255,255,255,0.15)"
                          strokeWidth="1.5"
                        />
                        <line
                          x1="28"
                          y1="46"
                          x2="36"
                          y2="46"
                          stroke="rgba(255,255,255,0.15)"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-white/50 text-lg font-semibold mb-1">
                        Sign in to render your floor plan
                      </p>
                      <p className="text-white/25 text-sm">
                        PNG, JPG · 2D architectural plans only
                      </p>
                    </div>

                    <div className="flex items-center gap-4 justify-center">
                      <div className="flex-1 h-px bg-white/8" />
                      <span className="text-white/20 text-xs uppercase tracking-widest">
                        or
                      </span>
                      <div className="flex-1 h-px bg-white/8" />
                    </div>

                    {/* Lock icon + CTA */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <rect
                            x="2"
                            y="6"
                            width="10"
                            height="7"
                            rx="1.5"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M4.5 6V4.5a2.5 2.5 0 015 0V6"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <button
                        onClick={handleAuthClick}
                        className="cursor-pointer inline-flex items-center gap-2 bg-[#C8A96E] hover:bg-[#d4b87a] active:scale-95 text-[#0D0D0D] text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-200"
                      >
                        Sign in with Puter
                      </button>
                      <p className="text-white/20 text-xs">
                        Free · No credit card needed
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p className="text-white/20 text-xs tracking-wide">
              No sign-up required · Works with any hand-drawn or digital floor
              plan
            </p>
          </div>
        </section>

        <section className="relative px-6 pb-24">
          {/* Section header */}
          <div className="max-w-6xl mx-auto mb-10 flex items-end justify-between">
            <div>
              <p className="text-[#C8A96E] text-xs tracking-[0.25em] uppercase font-semibold mb-2">
                Result
              </p>
              <h2 className="display-font text-3xl md:text-4xl font-bold text-white leading-tight">
                Here's your <em className="not-italic text-white/40">render</em>
              </h2>
            </div>

            {/* ── Storage notice banner ── */}

            {aiImage && (
              <div className="hidden md:flex items-center gap-3">
                <DownloadButton imageUrl={aiImage} />
              </div>
            )}
          </div>

          {aiImage && (
            <div className="relative z-10 max-w-3xl py-4 mx-auto px-6">
              <div className="flex items-center gap-3 bg-[#C8A96E]/[0.06] border border-[#C8A96E]/15 rounded-xl px-4 py-3">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <path
                    d="M2 3.5A1.5 1.5 0 013.5 2h7A1.5 1.5 0 0112 3.5v7A1.5 1.5 0 0110.5 12h-7A1.5 1.5 0 012 10.5v-7z"
                    stroke="#C8A96E"
                    strokeWidth="1.1"
                  />
                  <path
                    d="M5 2v3.5h4V2"
                    stroke="#C8A96E"
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 8.5h6"
                    stroke="#C8A96E"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 10.5h4"
                    stroke="#C8A96E"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-white/40 text-xs leading-relaxed flex-1">
                  Your uploads and generated renders will be
                  <span className="text-white/60">
                    {" "}
                    automatically removed
                  </span>{" "}
                  if you refresh the page, so make sure to download them
                </p>
              </div>
            </div>
          )}

          {/* Grid */}

          {aiImage ? (
            <>
              <div className="max-w-6xl mx-auto px-0 md:px-14 lg:px-40">
                <div className="relative flex flex-col items-center justify-center gap-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center overflow-hidden">
                  {/* Corner accents */}
                  <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[#C8A96E]/30 rounded-tl" />
                  <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-[#C8A96E]/30 rounded-tr" />
                  <span className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-[#C8A96E]/30 rounded-bl" />
                  <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[#C8A96E]/30 rounded-br" />

                  {/* contenct */}
                  <ImageCompareSlider
                    className=" w-full "
                    beforeSrc={uploadedImage}
                    afterSrc={aiImage}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="relative flex flex-col items-center justify-center gap-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-24 px-8 text-center overflow-hidden">
                {/* Corner accents */}
                <span className="absolute top-4 left-4 w-5 h-5 border-t border-l border-[#C8A96E]/30 rounded-tl" />
                <span className="absolute top-4 right-4 w-5 h-5 border-t border-r border-[#C8A96E]/30 rounded-tr" />
                <span className="absolute bottom-4 left-4 w-5 h-5 border-b border-l border-[#C8A96E]/30 rounded-bl" />
                <span className="absolute bottom-4 right-4 w-5 h-5 border-b border-r border-[#C8A96E]/30 rounded-br" />

                {/* Icon — two overlapping plan frames with an arrow */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  {/* Back frame (after / 3D side) */}
                  <div className="absolute top-2 right-0 w-12 h-12 rounded-lg border border-[#C8A96E]/20 bg-[#C8A96E]/5" />
                  {/* Front frame (before / 2D side) */}
                  <div className="absolute bottom-0 left-0 w-12 h-12 rounded-lg border border-white/15 bg-white/5 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <rect
                        x="2"
                        y="2"
                        width="8"
                        height="8"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                      />
                      <rect
                        x="12"
                        y="2"
                        width="8"
                        height="8"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                      />
                      <rect
                        x="2"
                        y="12"
                        width="8"
                        height="8"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                      />
                      <rect
                        x="12"
                        y="12"
                        width="8"
                        height="8"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  {/* Arrow */}
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#C8A96E]/15 border border-[#C8A96E]/30 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5h6M6 3l2 2-2 2"
                        stroke="#C8A96E"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <p className="text-white/70 text-base font-semibold tracking-tight">
                    Your render will appear here
                  </p>
                  <p className="text-white/25 text-sm max-w-xs mx-auto leading-relaxed">
                    Upload a 2D floor plan above and the AI-generated 3D
                    visualization will show up in this comparison view
                  </p>
                </div>

                {/* Scroll up hint */}
                <button
                  onClick={() => {
                    window.scrollTo({
                      top: 14,
                      behavior: "smooth",
                    });
                  }}
                  className="inline-flex items-center gap-2 text-[#C8A96E] text-xs font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 10V2M2 6l4-4 4 4"
                      stroke="#C8A96E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Upload a floor plan
                </button>
              </div>
            </div>
          )}
        </section>

        <Footer />
      </div>
    </>
  );
}
