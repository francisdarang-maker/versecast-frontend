import { useState, useEffect } from "react";
import { Monitor, Play, RefreshCw, SkipForward } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjectQueue } from "../context/ProjectQueueContext";

function HomePage() {
  const [displays, setDisplays] = useState([]);
  const [selectedDisplay, setSelectedDisplay] = useState("");
  const [bgUrl, setBgUrl] = useState("");

  // 🎯 queue context
  const { currentItem, next, queue } = useProjectQueue();

  // text fallback
  const text = currentItem?.text || "God is good all the time";

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getDisplays().then((list) => {
        setDisplays(list);
      });
    }
  }, []);

  const handleOpen = () => {
    if (selectedDisplay) {
      window.electronAPI.openProjector({
        displayId: Number(selectedDisplay),
        text,
        bgUrl,
      });
    }
  };

  const handleUpdate = () => {
    if (window.electronAPI) {
      window.electronAPI.updateProjector({ text, bgUrl });
    }
  };

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.updateProjector({ text, bgUrl });
    }
  }, [currentItem, bgUrl]);

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-gray-800 md:text-2xl">
        Home Controls
      </h1>

      {/* Display Selector */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-3">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <Monitor size={18} /> Select Display
        </label>
        <select
          value={selectedDisplay}
          onChange={(e) => setSelectedDisplay(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500"
        >
          <option value="">-- Choose a Display --</option>
          {displays.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* Background Input */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-3">
        <label className="text-sm font-medium text-gray-700">
          Background Image/Video URL
        </label>
        <input
          type="text"
          placeholder="https://example.com/bg.jpg"
          value={bgUrl}
          onChange={(e) => setBgUrl(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700">Preview</h2>
        <div className="mt-3 p-4 rounded-lg border bg-gray-100 text-center h-32 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={text} // 👈 ensures re-animation when text changes
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-gray-900"
            >
              {text}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleOpen}
          className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-md transition"
        >
          <Play size={18} /> Open Projector
        </button>
        <button
          onClick={handleUpdate}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-md transition"
        >
          <RefreshCw size={18} /> Update Projector
        </button>
        <button
          onClick={next}
          disabled={queue.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md transition disabled:opacity-50"
        >
          <SkipForward size={18} /> Next Item
        </button>
      </div>
    </div>
  );
}

export default HomePage;
