const STORAGE_KEY = "adventure-world-books";

export function getBooks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const books = stored ? JSON.parse(stored) : [];
    return Array.isArray(books) ? books : [];
  } catch {
    return [];
  }
}

export function saveBook(book) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([book, ...getBooks()]));
}

export function getBookById(id) {
  return getBooks().find((book) => book.id === id) ?? null;
}