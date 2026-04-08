export default function ResultCard({ item, index }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-white/[0.03] border border-white/8 hover:border-[#C8A96E]/30 transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.src}
          alt={item.label}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
        />
      </div>
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-80" />

      {/* Tag */}
      <div className="absolute top-3 right-3 bg-[#0D0D0D]/80 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-0.5">
        <span className="text-[10px] text-white/50 tracking-widest uppercase font-medium">
          {item.tag}
        </span>
      </div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
        <div>
          <p className="text-white text-sm font-semibold leading-tight">
            {item.label}
          </p>
          <p className="text-[#C8A96E] text-[11px] mt-0.5 tracking-wider uppercase font-medium">
            3D Render
          </p>
        </div>
        <button className="w-8 h-8 bg-[#C8A96E] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-[#d4b87a]">
          <svg
            className="w-3.5 h-3.5 text-[#0D0D0D]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
