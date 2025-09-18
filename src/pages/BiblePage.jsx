import { useEffect, useState } from "react";
import axios from "axios";

function BibleExplorer() {
  const [versions, setVersions] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedVerse, setSelectedVerse] = useState("");

  const [error, setError] = useState(null);

  // Fetch Versions
  useEffect(() => {
    const fetchBibleVersions = async () => {
      try {
        const version = await axios.get(
          "https://api.biblesupersearch.com/api/bibles"
        );
        const versionArray = Object.entries(version.data.results).map(
          ([key, value]) => ({
            key,
            ...value,
          })
        );
        setVersions(versionArray);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBibleVersions();
  }, []);

  // Fetch Books of Selected Version
  const fetchBibleBooks = async (versionKey) => {
    try {
      const book = await axios.get(
        `https://api.biblesupersearch.com/api/books?bible=${versionKey}`
      );
      setBooks(book.data.results);
      setSelectedBook(null);
      setSelectedChapter("");
      setSelectedVerse("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6  text-gray-200 min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-cyan-400 tracking-wide text-center drop-shadow-lg">
        ✨ Bible Explorer
      </h1>

      {error && <p className="text-red-400">{error}</p>}

      {/* Versions */}
      <div className="mb-6">
        <label className="block text-sm mb-2 text-cyan-300">
          Select Version
        </label>
        <select
          className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-600"
          value={selectedVersion?.key || ""}
          onChange={(e) => {
            const version = versions.find((v) => v.key === e.target.value);
            setSelectedVersion(version);
            fetchBibleBooks(version.key);
          }}
        >
          <option value="">-- choose a version --</option>
          {versions.map((version) => (
            <option key={version.key} value={version.key}>
              {version.name} ({version.shortname})
            </option>
          ))}
        </select>
      </div>

      {/* Books */}
      {books.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {books.map((book) => (
            <div
              key={book.id}
              className={`p-4 rounded-xl shadow-lg cursor-pointer transition ${
                selectedBook?.id === book.id
                  ? "bg-cyan-600 text-black"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
              onClick={() => {
                setSelectedBook(book);
                setSelectedChapter("");
                setSelectedVerse("");
              }}
            >
              <p className="font-bold">{book.name}</p>
              <p className="text-sm text-cyan-300">
                {book.chapters} chapters
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Chapter Selector */}
      {selectedBook && (
        <div className="mb-6">
          <label className="block text-sm mb-2 text-cyan-300">Chapter</label>
          <select
            className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-600"
            value={selectedChapter}
            onChange={(e) => {
              setSelectedChapter(e.target.value);
              setSelectedVerse("");
            }}
          >
            <option value="">-- choose a chapter --</option>
            {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map(
              (ch) => (
                <option key={ch} value={ch}>
                  Chapter {ch}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {/* Verse Input */}
      {selectedChapter && (
        <div className="mb-6">
          <label className="block text-sm mb-2 text-cyan-300">Verse</label>
          <input
            type="number"
            placeholder="Enter verse number"
            value={selectedVerse}
            onChange={(e) => setSelectedVerse(e.target.value)}
            className="w-full bg-slate-800 text-white p-3 rounded-lg border border-slate-600"
          />
        </div>
      )}

      {/* Selected Reference Display */}
      {selectedBook && selectedChapter && (
        <div className="mt-6 p-5 bg-slate-800 rounded-lg shadow-lg border border-cyan-500">
          <p className="text-cyan-300 text-lg font-semibold">
            📖 {selectedVersion?.shortname}: {selectedBook.name} {selectedChapter}
            {selectedVerse && `:${selectedVerse}`}
          </p>
        </div>
      )}
    </div>
  );
}

export default BibleExplorer;
