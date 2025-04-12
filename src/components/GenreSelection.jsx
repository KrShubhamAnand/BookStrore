import React from "react";
import {
  BookOpen,
  Drama,
  Laugh,
  Landmark,
  Brain,
  History,
  Compass,
  ChevronRight,
} from "lucide-react"; // Custom mapping below

const GENRES = [
  "Fiction",
  "Drama",
  "Humor",
  "Politics",
  "Philosophy",
  "History",
  "Adventure",
];

// Icon map based on genre
const genreIcons = {
  Fiction: BookOpen,
  Drama: Drama, // Custom replacement needed if Drama doesn't exist
  Humor: Laugh,
  Politics: Landmark,
  Philosophy: Brain,
  History: History,
  Adventure: Compass,
};

export default function GenreSelection({ onSelectGenre }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-[#F0F0F6]">
      <h1 className="text-4xl font-bold mb-8 text-[#5E56E7]">Gutenberg Project</h1>
      <p className="text-center max-w-xl mb-10">
        A social cataloging website that allows you to freely search its database of books,
        annotations, and reviews.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
        {GENRES.map((genre) => {
          const Icon = genreIcons[genre] || BookOpen;

          return (
            <div
              key={genre}
              onClick={() => onSelectGenre(genre)}
              className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Icon size={20} color="#5E56E7" />
                <span className="text-black font-semibold tracking-wide text-base">
                  {genre.toUpperCase()}
                </span>
              </div>
              <ChevronRight color="#5E56E7" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
