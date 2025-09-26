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
      description: "The gold standard for writing maintainable, readable code. This book teaches you the principles and practices of clean coding that separate professionals from amateurs.",
      highlights: [
        "Learn to write code that expresses intent clearly",
        "Master the art of meaningful naming and functions",
        "Understand how to structure classes and systems",
        "Develop habits that prevent technical debt"
      ]
    },
    {
      id: 2,
      title: "The Pragmatic Programmer: From Journeyman to Master",
      author: "Andrew Hunt & David Thomas",
      difficulty: "intermediate",
      rating: 4.7,
      categories: ["career", "fundamentals"],
      description: "A classic guide that teaches practical approaches to software development. Updated 20th anniversary edition covers modern development practices.",
      highlights: [
        "70+ practical tips for better programming",
        "Learn to think like a pragmatic programmer",
        "Master debugging and testing techniques",
        "Understand software entropy and how to fight it"
      ]
    },
    {
            id: 3,
            title: "Designing Data-Intensive Applications",
            author: "Martin Kleppmann",
            difficulty: "advanced",
            rating: 4.9,
            categories: ["architecture", "patterns"],
            description: "The definitive guide to building scalable, reliable systems. Essential for understanding distributed systems and data architecture.",
            highlights: [
                "Deep dive into database internals",
                "Learn distributed systems principles",
                "Master data modeling and storage",
                "Understand consistency, availability, and partition tolerance"
            ]
        },
        {
            id: 4,
            title: "Code Complete: A Practical Handbook of Software Construction",
            author: "Steve McConnell",
            difficulty: "intermediate",
            rating: 4.6,
            categories: ["fundamentals", "patterns"],
            description: "Comprehensive guide to software construction covering everything from design to debugging. Often called the 'manual of software engineering.'",
            highlights: [
                "Complete software development lifecycle",
                "Best practices for code construction",
                "Detailed debugging and testing strategies",
                "Performance optimization techniques"
            ]
        },
        {
            id: 5,
            title: "Introduction to Algorithms (CLRS)",
            author: "Cormen, Leiserson, Rivest & Stein",
            difficulty: "advanced",
            rating: 4.5,
            categories: ["algorithms"],
            description: "The comprehensive reference for algorithms and data structures. Used in computer science courses worldwide.",
            highlights: [
                "Complete coverage of fundamental algorithms",
                "Mathematical analysis and proofs",
                "Advanced data structures",
                "Graph algorithms and dynamic programming"
            ]
        },
        {
            id: 6,
            title: "System Design Interview",
            author: "Alex Xu",
            difficulty: "intermediate",
            rating: 4.4,
            categories: ["architecture", "career"],
            description: "Practical guide to system design interviews and building scalable systems. Perfect for preparing for tech interviews.",
            highlights: [
                "Step-by-step system design process",
                "Real-world case studies",
                "Scalability patterns and trade-offs",
                "Interview preparation strategies"
            ]
        },
        {
            id: 7,
            title: "Refactoring: Improving the Design of Existing Code",
            author: "Martin Fowler",
            difficulty: "intermediate",
            rating: 4.7,
            categories: ["fundamentals", "patterns"],
            description: "Learn how to improve code structure without changing functionality. Essential for maintaining and evolving codebases.",
            highlights: [
                "Catalog of refactoring techniques",
                "When and how to refactor safely",
                "Code smell identification",
                "Automated refactoring tools and techniques"
            ]
        },
        {
            id: 8,
            title: "Effective Java",
            author: "Joshua Bloch",
            difficulty: "advanced",
            rating: 4.8,
            categories: ["patterns", "fundamentals"],
            description: "Best practices for Java programming from the architect of Java Collections Framework. Principles apply to other languages too.",
            highlights: [
                "90 best practices for Java development",
                "Object-oriented design principles",
                "Performance optimization tips",
                "Common pitfalls and how to avoid them"
            ]
        },
        {
            id: 9,
            title: "The Software Engineer's Guidebook",
            author: "Gergely Orosz",
            difficulty: "beginner",
            rating: 4.6,
            categories: ["career", "fundamentals"],
            description: "Comprehensive guide to thriving as a software engineer, covering technical skills, career growth, and industry insights.",
            highlights: [
                "Career progression strategies",
                "Technical leadership skills",
                "Industry insights and trends",
                "Work-life balance for developers"
            ]
        },
        {
            id: 10,
            title: "Cracking the Coding Interview",
            author: "Gayle Laakmann McDowell",
            difficulty: "intermediate",
            rating: 4.3,
            categories: ["algorithms", "career"],
            description: "The ultimate guide for technical interviews at top tech companies. Includes 189 programming problems and solutions.",
            highlights: [
                "189 programming interview questions",
                "Step-by-step solution walkthroughs",
                "Big O analysis and optimization",
                "System design interview prep"
            ]
        }
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
