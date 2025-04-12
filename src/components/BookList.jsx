import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import BookCard from "./BookCard";

const API_BASE = "http://skunkworks.ignitesol.com:8000/books";

export default function BookList({ genre, onBack }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const loader = useRef(null);

  // Construct API URL dynamically based on filters and search
  const buildApiUrl = (url) => {
    if (url) return url;
    const params = new URLSearchParams();
    params.append("mime_type", "image/");
    params.append("topic", genre);
    if (searchTerm) params.append("search", searchTerm);
    return `${API_BASE}?${params.toString()}`;
  };

  // Fetch books from API
  const fetchBooks = useCallback(
    async (url = null) => {
      const apiUrl = buildApiUrl(url);
      const res = await axios.get(apiUrl);
      const filteredBooks = res.data.results.filter((book) => book.formats["image/jpeg"]);
      setBooks((prev) => [...prev, ...filteredBooks]);
      setNextUrl(res.data.next);
    },
    [genre, searchTerm]
  );

  // Initial and filtered fetch
  useEffect(() => {
    setBooks([]);
    fetchBooks();
  }, [fetchBooks]);

  // Setup infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextUrl) fetchBooks(nextUrl);
      },
      { threshold: 1.0 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [nextUrl, fetchBooks]);

  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="mb-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
      >
        ← Back
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-[#5E56E7]">{genre}</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setBooks([]);
          setSearchTerm(e.target.value);
        }}
        placeholder="Search by title or author..."
        className="mb-8 px-2 py-2 w-full border border-gray-300 rounded"
      />
      <div className="grid gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-6 justify-center px-16">

        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div ref={loader} className="h-10"></div>
    </div>
  );
}