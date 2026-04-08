import { useOutletContext } from "react-router";

export default function Navbar() {
  const { isSignedIn, username, signIn, signOut } =
    useOutletContext<AuthContext>();

  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (error) {
        console.log(error, "signout failed");
      }

      return;
    }

    try {
      await signIn();
    } catch (error) {
      console.log(error, "signin failed");
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{
        background:
          "linear-gradient(to bottom, rgba(13,13,13,0.95) 0%, transparent 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 relative">
          <div className="absolute inset-0 border border-[#C8A96E] rounded-sm rotate-12" />
          <div className="absolute inset-1 bg-[#C8A96E] rounded-sm" />
        </div>
        <span className="text-white font-bold tracking-tight text-lg">
          roomio<span className="text-[#C8A96E]">·ai</span>
        </span>
      </div>

      {/* Nav links */}
      {/* <div className="hidden md:flex items-center gap-8">
        {["How it works", "Gallery", "Pricing"].map((item) => (
          <a
            key={item}
            href="#"
            className="text-white/45 hover:text-white text-sm transition-colors duration-200 tracking-wide"
          >
            {item}
          </a>
        ))}
      </div> */}

      {/* CTA */}
      <button
        onClick={handleAuthClick}
        className="cursor-pointer inline-flex items-center gap-2 border border-white/15 hover:border-[#C8A96E]/60 text-white text-sm px-5 py-2 rounded-full transition-all duration-200 hover:bg-[#C8A96E]/5"
      >
        {isSignedIn ? `Hi, ${username}` : "Sign in"}

        {isSignedIn ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 text-[#C8A96E]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
            />
          </svg>
        ) : (
          <svg
            className="size-5 text-[#C8A96E]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H7M17 7v10"
            />
          </svg>
        )}
      </button>
    </nav>
  );
}
