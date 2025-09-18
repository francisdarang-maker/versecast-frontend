import { Link, useLocation } from "react-router-dom";
import { House, Music, BookOpen, Settings } from "lucide-react";

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
      <div className="flex flex-col items-center justify-center bg-violet-100 rounded-2xl shadow-xl p-4 mb-6 h-50">
        <h2 className="text-xl font-bold text-black">VerseCast</h2>
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
