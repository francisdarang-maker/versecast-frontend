import { Link, useLocation } from "react-router-dom";
import { House, Music, BookOpen, Settings } from "lucide-react";
import Logo from '../assets/VerseCast-Logo.svg'

function Sidebar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Home", icon: House },
    { path: "/songs", label: "Songs", icon: Music },
    { path: "/bible", label: "Bible", icon: BookOpen },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="flex flex-col p-4 text-white h-full">
      {/* Logo / Title */}
      {/* Logo / Title */}
<div className="relative flex flex-col items-center justify-center rounded-2xl shadow-2xl p-6 mb-6 overflow-hidden group">
  {/* Animated gradient background */}
  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-blue-500/20 backdrop-blur-xl rounded-2xl group-hover:from-violet-500/30 group-hover:to-blue-500/30 transition-all duration-500"></div>

  {/* Glow border */}
  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 shadow-[0_0_20px_rgba(139,92,246,0.4)]"></div>

  {/* Logo */}
  <img
    src={Logo}
    alt="VerseCast Logo"
    className="relative z-10 aspect-square h-20 w-20 drop-shadow-[0_0_10px_rgba(139,92,246,0.7)] transition-transform duration-500 group-hover:scale-110"
  />

  {/* Title */}
  <h2 className="relative z-10 mt-3 text-2xl font-extrabold tracking-wider bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
    VerseCast
  </h2>
</div>


      {/* Links */}
      {links.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className={`flex items-center gap-3 px-4 py-2 my-1 rounded-lg transition-colors ${
            location.pathname === path
              ? "bg-violet-600 text-white font-semibold shadow"
              : "hover:bg-slate-700"
          }`}
        >
          <Icon size={20} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}

export default Sidebar;
