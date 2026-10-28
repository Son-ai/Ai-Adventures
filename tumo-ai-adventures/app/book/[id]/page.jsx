"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBookById } from "@/services/storage";
import "./reader.css";

function BookReader({ title, pages }) {
  const [page, setPage] = useState(0);

  return (
    <article className="reader card">
      <h1 className="reader__title">{title}</h1>

      <div className="reader__paper">
        <p>{pages[page]}</p>
      </div>

      <div className="reader__controls">
        <button type="button" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
          ← Previous
        </button>
        <span>
          Page {page + 1} of {pages.length}
        </span>
        <button type="button" disabled={page === pages.length - 1} onClick={() => setPage((p) => p + 1)}>
          Next →
        </button>
      </div>
    </article>
  );
}

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // The book is read from this browser, no backend request needed.
    setBook(getBookById(id));
    setLoaded(true);
  }, [id]);

  return (
    <section className="page">
      <div className="reader-wrap">
        <Link className="reader__back" href="/adventures">
          ← My Adventures
        </Link>
        {!loaded && <p>Loading book…</p>}
        {loaded && !book && <p role="alert">Book not found in this browser.</p>}
        {loaded && book && <BookReader key={book.id} title={book.title} pages={book.pages} />}
      </div>
    </section>
  );
}