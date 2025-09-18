// components/RightPreview.jsx
import ProjectorPreview from "./ProjectorPreview";
import { useProjectQueue } from "../context/ProjectQueueContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DraggableQueueItem from "./DraggableQueueItem";

function RightPreview() {
  const {
    currentItem,
    next,
    previous,
    currentIndex,
    queue,
    deleteFromQueue,
    reorderQueue,
  } = useProjectQueue();

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      <h2 className="text-sm font-bold mb-2 text-gray-700 px-2 pt-2">Preview</h2>

      {/* Projector preview */}
      <div className="w-full aspect-video rounded-lg overflow-hidden shadow mb-3">
        <ProjectorPreview isPreview={true} />
      </div>

      {/* Queue List */}
      <div className="flex-1 overflow-y-auto space-y-2 px-2">
        {queue.length > 0 ? (
          queue.map((item, idx) => (
            <DraggableQueueItem
              key={idx}
              item={item}
              idx={idx}
              currentIndex={currentIndex}
              deleteFromQueue={deleteFromQueue}
              moveItem={reorderQueue}
            />
          ))
        ) : (
          <p className="text-gray-400 italic text-center mt-6">
            No items in queue
          </p>
        )}
      </div>

      {/* Controls */}
      {queue.length > 0 && (
        <div className="mt-auto flex justify-between items-center px-3 py-2 border-t bg-gray-50">
          <button
            onClick={previous}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={16} /> Prev
          </button>
          <span className="text-xs text-gray-500 font-medium">
            {currentIndex + 1} / {queue.length}
          </span>
          <button
            onClick={next}
            className="flex items-center gap-1 px-3 py-1.5 bg-violet-500 hover:bg-violet-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentIndex === queue.length - 1}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default RightPreview;
