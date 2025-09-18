import Sidebar from "./components/Sidebar";
import RightPreview from "./components/RightPreview";
import { useLocation } from "react-router-dom";

function MainLayout({ children }) {
  const location = useLocation();
  const isProjector = location.pathname.startsWith("/projector");

if (isProjector) {
  return (
    <main className="fixed inset-0 bg-black overflow-hidden">
      {children}
    </main>
  );
}

return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar */}
      <aside className="w-64 bg-[#1E293B] text-white p-4">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {children}
      </main>

      {/* Right Sidebar (Preview) */}
      <aside className="w-80 bg-white border-l p-4 shadow-inner">
        <RightPreview />
        
      </aside>
    </div>
  );
}

export default MainLayout;
