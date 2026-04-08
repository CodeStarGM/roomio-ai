import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 relative">
          <div className="absolute inset-0 border border-[#C8A96E] rounded-sm rotate-12" />
          <div className="absolute inset-0.5 bg-[#C8A96E] rounded-sm" />
        </div>
        <span className="text-white/40 text-sm">
          roomio<span className="text-[#C8A96E]">·ai</span> © 2026
        </span>
      </div>
      <p className="text-white/20 text-xs">
        Built for architects, designers & dreamers.
      </p>
      <div className="flex gap-5">
        {["Privacy", "Terms", "Contact"].map((l) => (
          <a
            key={l}
            href="#"
            className="text-white/25 hover:text-white/60 text-xs transition-colors"
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
