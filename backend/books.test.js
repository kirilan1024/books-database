const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import the app or create a minimal version for testing
let app;
let server;
let books;
let nextId;

beforeEach(() => {
  app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // In-memory DB for test isolation
  books = [
    { id: 1, title: 'Test Book', author: 'Author', difficulty: 'beginner', rating: 5, categories: ['fundamentals'], description: 'desc', highlights: ['h1'] }
  ];
  nextId = 2;

  app.get('/api/books', (req, res) => res.json(books));
  app.post('/api/books', (req, res) => {
    const book = { ...req.body, id: nextId++ };
    books.push(book);
    res.status(201).json(book);
  });
});

describe('Books API', () => {
  it('GET /api/books returns books', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].title).toBe('Test Book');
  });

  it('POST /api/books adds a book', async () => {
    const newBook = { title: 'B', author: 'A', difficulty: 'beginner', rating: 4, categories: ['fundamentals'], description: 'd', highlights: ['h'] };
    const res = await request(app).post('/api/books').send(newBook);
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('B');
    expect(books.length).toBe(2);
  });
});
