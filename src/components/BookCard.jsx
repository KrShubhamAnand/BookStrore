import React from "react";

// Handles book card rendering and format priority logic
export default function BookCard({ book }) {
  const openBook = () => {
    const formats = book.formats;
    const preferredOrder = ["text/html", "application/pdf", "text/plain"];
    for (let format of preferredOrder) {
      for (let key in formats) {
        if (key.includes(format) && !key.includes(".zip")) {
          window.open(formats[key], "_blank");
          return;
        }
      }
    }
    alert("No viewable version available");
  };

  return (
    <div
      className="cursor-pointer"
      onClick={openBook}
    >
      <div className="w-[114px] h-[162px] rounded-[8px] shadow-[0_2px_5px_rgba(211,209,238,0.5)] overflow-hidden">
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="mt-1">
        <p className="text-[12px] font-[400] font-[Montserrat] truncate" title={book.title}>{book.title}</p>
        <p className="text-[12px] font-[400] font-[Montserrat] text-gray-600 truncate" title={book.authors?.[0]?.name}>{book.authors?.[0]?.name || "Unknown Author"}</p>
      </div>
    </div>
  );
}