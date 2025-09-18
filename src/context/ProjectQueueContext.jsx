// contexts/ProjectQueueContext.jsx
import { createContext, useContext, useState } from "react";

export const ProjectType = {
  LYRICS: "lyrics",
  VERSE: "verse",
  QUOTE: "quote",
  STORY: "story",
};

const ProjectQueueContext = createContext();

export function ProjectQueueProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addToQueue = (item) => {
    setQueue((prev) => [...prev, item]);
  };

  const next = () => {
    setCurrentIndex((i) => (i < queue.length - 1 ? i + 1 : i));
  };

  const previous = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : i));
  };

  const deleteFromQueue = (index) => {
    setQueue((prev) => {
      const updated = prev.filter((_, i) => i !== index);

      // adjust currentIndex if needed
      if (index < currentIndex) {
        setCurrentIndex((i) => Math.max(i - 1, 0));
      } else if (index === currentIndex && currentIndex >= updated.length) {
        setCurrentIndex((i) => Math.max(i - 1, 0));
      }

      return updated;
    });
  };

  const reorderQueue = (fromIndex, toIndex) => {
  setQueue((prev) => {
    const updated = [...prev];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    return updated;
  });
};


  const currentItem = queue[currentIndex] || null;

  return (
    <ProjectQueueContext.Provider
      value={{
        queue,
        addToQueue,
        deleteFromQueue,
        currentItem,
        currentIndex,
        next,
        previous,
        reorderQueue
      }}
    >
      {children}
    </ProjectQueueContext.Provider>
  );
}

export function useProjectQueue() {
  return useContext(ProjectQueueContext);
}
