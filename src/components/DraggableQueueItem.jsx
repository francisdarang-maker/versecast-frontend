// components/DraggableQueueItem.jsx
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Trash2 } from "lucide-react";

const ItemTypes = {
  QUEUE_ITEM: "QUEUE_ITEM",
};

function DraggableQueueItem({ item, idx, currentIndex, moveItem, deleteFromQueue }) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.QUEUE_ITEM,
    hover(dragged) {
      if (dragged.index !== idx) {
        moveItem(dragged.index, idx);
        dragged.index = idx;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.QUEUE_ITEM,
    item: { index: idx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center justify-between p-3 rounded-lg border shadow-sm transition cursor-move ${
        idx === currentIndex
          ? "bg-violet-100 border-violet-400"
          : "bg-gray-50 hover:bg-gray-100"
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-500">{item.type.toUpperCase()}</p>
        <p className="text-sm text-gray-800 line-clamp-2 break-words">{item.text}</p>
      </div>
      <button
        onClick={() => deleteFromQueue(idx)}
        className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded"
        title="Remove from queue"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default DraggableQueueItem;
