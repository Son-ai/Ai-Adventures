"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getBooks } from "@/services/storage";
import "./stories.css";

function BookCard({ book }) {
    return (
        <Link className="story-card" href={`/book/${book.id}`}>
            <span className="story-card__icon" aria-hidden="true">📖</span>
            <span className="story-card__text">
                <strong>{book.title}</strong>
                <small>
                    {book.world} · {book.pages.length} pages
                </small>
            </span>
            <span aria-hidden="true">→</span>
        </Link>
    );
}

export default function AdventuresPage() {
    const [books, setBooks] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // localStorage exists only in the browser, so read it after mounting.
        setBooks(getBooks());
        setLoaded(true);
    }, []);

    return (
        <section className="page">
            <div className="library card">
                <div className="library__top">
                    <div>
                        <p className="library__eyebrow">Your library</p>
                        <h1 className="library__title">My Adventures</h1>
                    </div>
                    <Link className="start-button" href="/create">
                        + Create Adventure
                    </Link>
                </div>

                {!loaded && <p>Loading books…</p>}
                {loaded && books.length === 0 && (
                    <p className="library__empty">No adventures yet. Create your first story!</p>
                )}

                <div className="library__list">
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </section>
    );
}