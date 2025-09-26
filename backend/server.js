// server.js (ESM version, no body-parser)
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // replaces body-parser.json()

// In-memory books database
let books = [];
let nextId = 1;

// Seed initial data (same as your current app)
function seedInitialData() {
  books = [
    {
      id: 1,
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Robert C. Martin (Uncle Bob)",
      difficulty: "intermediate",
      rating: 4.8,
      categories: ["fundamentals", "career"],
      description:
        "The gold standard for writing maintainable, readable code. This book teaches you the principles and practices of clean coding that separate professionals from amateurs.",
      highlights: [
        "Learn to write code that expresses intent clearly",
        "Master the art of meaningful naming and functions",
        "Understand how to structure classes and systems",
        "Develop habits that prevent technical debt",
      ],
    },
    {
      id: 2,
      title: "The Pragmatic Programmer: From Journeyman to Master",
      author: "Andrew Hunt & David Thomas",
      difficulty: "intermediate",
      rating: 4.7,
      categories: ["career", "fundamentals"],
      description:
        "A classic guide that teaches practical approaches to software development. Updated 20th anniversary edition covers modern development practices.",
      highlights: [
        "70+ practical tips for better programming",
        "Learn to think like a pragmatic programmer",
        "Master debugging and testing techniques",
        "Understand software entropy and how to fight it",
      ],
    },
    // … keep the rest of your books unchanged …
  ];
  nextId = books.length + 1;
}

seedInitialData();

// REST API endpoints
app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
});

app.post("/api/books", (req, res) => {
  const book = { ...req.body, id: nextId++ };
  books.push(book);
  res.status(201).json(book);
});

app.put("/api/books/:id", (req, res) => {
  const idx = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Book not found" });
  books[idx] = { ...books[idx], ...req.body, id: books[idx].id };
  res.json(books[idx]);
});

app.delete("/api/books/:id", (req, res) => {
  const idx = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Book not found" });
  const deleted = books.splice(idx, 1)[0];
  res.json(deleted);
});

app.delete("/api/books", (req, res) => {
  books = [];
  nextId = 1;
  res.json({ message: "All books deleted" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});