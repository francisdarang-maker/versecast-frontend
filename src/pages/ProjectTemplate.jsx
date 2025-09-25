// components/Templates.jsx
import React from "react";

export function SongTemplate({ text, bgUrl }) {
  return (
    <div
      className="flex flex-col items-center justify-center h-full p-8 rounded-xl shadow-xl"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-white text-5xl font-extrabold text-center leading-snug drop-shadow-lg">
        {text}
      </h1>
      <p className="mt-6 text-sm text-purple-200 italic animate-pulse">
        🎶 Lyrics Display 🎶
      </p>
    </div>
  );
}

export function VerseTemplate({ text, reference, bgUrl }) {
  return (
    <div
      className="flex flex-col justify-center h-full p-10 rounded-xl shadow-2xl"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-white text-4xl font-light text-center leading-relaxed tracking-wide drop-shadow-md">
          {text}
        </h1>
      </div>
      <div className="h-[60px] flex justify-end items-center pr-6">
        <p className="text-gray-200 text-md font-medium italic">
          ✦ {reference}
        </p>
      </div>
    </div>
  );
}
