import React from "react";

export function SongTemplate({ text }) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-white text-5xl font-bold text-center leading-snug">
        {text}
      </h1>
      <p className="mt-6 text-sm text-gray-300 italic">
        🎶 Lyrics Display 🎶
      </p>
    </div>
  );
}

export function VerseTemplate({ text, reference }) {
  return (
    <div className="flex flex-col justify-center h-full p-8">
      {/* Verse text in the center */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-white text-4xl font-semibold text-center leading-relaxed">
          {text}
        </h1>
      </div>

      {/* Footer area with reference */}
      <div className="h-[50px] flex justify-end items-center pr-8">
        <p className="text-gray-300 text-lg font-medium">{reference}</p>
      </div>
    </div>
  );
}
