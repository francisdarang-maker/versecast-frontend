import { useProjectQueue, ProjectType } from "../context/ProjectQueueContext";
import worshipSongs from "../data/songsJson.json";

function SongPage() {
  const { addToQueue } = useProjectQueue();

  const handleAdd = (song, part) => {
    addToQueue({
      type: ProjectType.LYRICS,
      text: part.text,
      title: `${song.title} - ${part.label}`,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Worship Songs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {worshipSongs.map((song) => (
          <div
            key={song.id}
            className="bg-white border rounded-2xl shadow-md p-4 flex flex-col hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-violet-700 mb-3">
              {song.title}
            </h2>

            <div className="space-y-2">
              {song.parts.map((part, idx) => (
                <div
                  key={idx}
                  className="flex flex-col p-2 bg-slate-50 rounded border"
                >
                  <p className="text-xs font-semibold text-gray-500">
                    {part.label}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {part.text}
                  </p>

                  <button
                    onClick={() => handleAdd(song, part)}
                    className="mt-2 self-end px-2 py-1 bg-violet-500 hover:bg-violet-600 text-white text-xs rounded"
                  >
                    ➕ Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SongPage;
