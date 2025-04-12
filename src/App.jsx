import React, { useState } from "react";
import GenreSelection from "./components/GenreSelection";
import BookList from "./components/BookList";

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedGenre, setSelectedGenre] = useState("");

  return (
    <div className="min-h-screen bg-gray-100">
      {page === "home" ? (
        <GenreSelection
          onSelectGenre={(genre) => {
            setSelectedGenre(genre);
            setPage("books");
          }}
        />
      ) : (
        <BookList
          genre={selectedGenre}
          onBack={() => setPage("home")}
        />
      )}
    </div>
  );
}