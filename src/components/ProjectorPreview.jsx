// import { useEffect, useState } from "react";
// import { useProjectQueue } from "../context/ProjectQueueContext";


// function ProjectorPreview({ isPreview = false }) {
//   const [content, setContent] = useState({ text: "", bgUrl: "" });

//   const { queue } = useProjectQueue()
//   console.log(queue)  
  
//   useEffect(() => {
//     if (window.electronAPI) {
//       window.electronAPI.onUpdateContent((payload) => {
//         setContent(payload);
//       });
//     }
//   }, []);

//   return (
//     <div
//       className={`relative w-full h-full bg-black overflow-hidden`}
//     >
//       {/* Background */}
//       {content.bgUrl ? (
//         content.bgUrl.endsWith(".mp4") || content.bgUrl.endsWith(".webm") ? (
//           <video
//             src={content.bgUrl}
//             autoPlay
//             loop
//             muted
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//         ) : (
//           <img
//             src={content.bgUrl}
//             alt="Background"
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//         )
//       ) : null}

//       {/* Text */}
//       {content.text && (
//         <div className="absolute inset-0 flex items-center justify-center p-6">
//           <h1
//             className={`text-white font-bold text-center opacity-0 animate-fadeIn 
//             ${
//               isPreview ? "text-sm" : "text-5xl"}
//               `}
//           >
//             {content.text}
//           </h1>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProjectorPreview;


import { useEffect, useState } from "react";
import { useProjectQueue } from "../context/ProjectQueueContext";
import { motion, AnimatePresence } from "framer-motion";

function ProjectorPreview({ isPreview = false }) {
  const [content, setContent] = useState({ text: "", bgUrl: "" });

  const { queue } = useProjectQueue()
  console.log(queue)  
  
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onUpdateContent((payload) => {
        setContent(payload);
      });
    }
  }, []);

  return (
    <div
      className={`relative w-full h-full bg-black overflow-hidden`}
    >
      {/* Background */}
      {content.bgUrl ? (
        content.bgUrl.endsWith(".mp4") || content.bgUrl.endsWith(".webm") ? (
          <video
            src={content.bgUrl}
            autoPlay
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src={content.bgUrl}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )
      ) : null}

      <div className="absolute inset-0 flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        {content.text && (
          <motion.h1
            key={content.text} // 👈 important: makes each new text animate
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`text-white font-bold text-center ${
              isPreview ? "text-sm" : "text-5xl"
            }`}
          >
            {content.text}
          </motion.h1>
        )}
      </AnimatePresence>
</div>
    </div>
  );
}

export default ProjectorPreview;
