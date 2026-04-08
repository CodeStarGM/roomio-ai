interface DownloadButtonProps {
  imageUrl: string;
  filename?: string;
}

export default function DownloadButton({
  imageUrl,
  filename = "roomio-ai-render.png",
}: DownloadButtonProps) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = filename;
    a.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="animate-bounce inline-flex items-center gap-2 bg-[#C8A96E] hover:bg-[#d4b87a] active:scale-95 text-[#0D0D0D] text-xs font-bold tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-200"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 1v8M4 6l3 3 3-3M2 11h10"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Download Render
    </button>
  );
}
