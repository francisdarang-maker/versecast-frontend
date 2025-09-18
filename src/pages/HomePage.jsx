import { useState, useEffect } from "react";
import { Monitor, Play, RefreshCw } from "lucide-react";

function HomePage() {
  const [displays, setDisplays] = useState([]);
  const [selectedDisplay, setSelectedDisplay] = useState("");
  const [text, setText] = useState("Hello VerseCast!");
  const [bgUrl, setBgUrl] = useState("");

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

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.updateProjector({ text, bgUrl });
    }
  }, [text, bgUrl]);

  const handleUpdate = () => {
    window.electronAPI.updateProjector({ text, bgUrl });
  };

  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-gray-800">🎛 Home Controls</h1>

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

      {/* Text Input */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-3">
        <label className="text-sm font-medium text-gray-700">Projector Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-violet-500"
          rows={4}
        />
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
      </div>
    </div>
  );
}

export default HomePage;
