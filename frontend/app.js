// API base URL
const API_URL = 'http://localhost:3001/api/books';


let currentFilter = 'all';
let currentEditingId = null;
let lastServerError = false;


// Fetch all books from backend, handle server unreachable
async function fetchBooks() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Server error');
        lastServerError = false;
        return await res.json();
    } catch (e) {
        lastServerError = true;
        showServerError();
        return [];
    }
}

function showServerError() {
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">
        <h3>Cannot connect to server</h3>
        <p>The backend server is not reachable. Please check your connection or try again later.</p>
    </div>`;
    updateStats([]);
}

// Render books
async function renderBooks(booksToShow = null) {
    const books = booksToShow || await fetchBooks();
    const grid = document.getElementById('booksGrid');
    if (lastServerError) {
        // Error message already shown by showServerError
        return;
    }
    if (books.length === 0) {
        grid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;"><h3>No books found</h3><p>Add some books to get started or adjust your search criteria.</p></div>`;
        updateStats([]);
        return;
    }
    grid.innerHTML = '';
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-actions">
                <button class="book-action-btn edit-btn" onclick="editBook(${book.id})" title="Edit">✏️</button>
                <button class="book-action-btn delete-btn" onclick="deleteBook(${book.id})" title="Delete">🗑️</button>
            </div>
            <div class="book-header">
                <div class="book-title">${book.title}</div>
                <div class="difficulty-badge ${book.difficulty}">${book.difficulty.charAt(0).toUpperCase() + book.difficulty.slice(1)}</div>
            </div>
            <div class="book-author">by ${book.author}</div>
            <div class="book-rating">
                <span class="stars">${'★'.repeat(Math.floor(book.rating))}${'☆'.repeat(5-Math.floor(book.rating))}</span>
                <span>${book.rating}/5</span>
            </div>
            <div class="book-description">${book.description}</div>
            <div class="book-highlights">
                <h4>Key Benefits:</h4>
                <ul>${book.highlights.map(highlight => `<li>${highlight}</li>`).join('')}</ul>
            </div>
            <div class="category-tags">
                ${book.categories.map(cat => `<span class="tag">${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>`).join('')}
            </div>
        `;
        grid.appendChild(bookCard);
    });
    updateStats(books);
}

function updateStats(books) {
    const totalBooks = books.length;
    const avgRating = totalBooks > 0 ? (books.reduce((sum, book) => sum + book.rating, 0) / totalBooks).toFixed(1) : '0.0';
    const uniqueCategories = new Set(books.flatMap(book => book.categories)).size;
    document.getElementById('totalBooks').textContent = totalBooks;
    document.getElementById('avgRating').textContent = avgRating;
    document.getElementById('categories').textContent = uniqueCategories;
}

async function filterBooks(category) {
    currentFilter = category;
    let books = await fetchBooks();
    if (category !== 'all') {
        books = books.filter(book => book.categories.includes(category));
    }
    // Apply search if there's a query
    const searchQuery = document.getElementById('searchInput').value;
    if (searchQuery) {
        books = books.filter(book =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    renderBooks(books);
}

async function searchBooks() {
    const query = document.getElementById('searchInput').value;
    let books = await fetchBooks();
    books = books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.description.toLowerCase().includes(query.toLowerCase()) ||
        book.highlights.some(h => h.toLowerCase().includes(query.toLowerCase()))
    );
    if (currentFilter !== 'all') {
        books = books.filter(book => book.categories.includes(currentFilter));
    }
    renderBooks(books);
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    filterBooks(currentFilter);
}

function openAddModal() {
    currentEditingId = null;
    document.getElementById('modalTitle').textContent = 'Add New Book';
    document.getElementById('bookForm').reset();
    clearHighlights();
    addHighlight();
    document.getElementById('bookModal').style.display = 'block';
}

async function editBook(id) {
    currentEditingId = id;
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) return;
    const book = await res.json();
    document.getElementById('modalTitle').textContent = 'Edit Book';
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;
    document.getElementById('bookDifficulty').value = book.difficulty;
    document.getElementById('bookRating').value = book.rating;
    document.getElementById('bookDescription').value = book.description;
    // Set categories
    const categoryCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
        checkbox.checked = book.categories.includes(checkbox.value);
    });
    // Set highlights
    clearHighlights();
    book.highlights.forEach(highlight => {
        addHighlight(highlight);
    });
    document.getElementById('bookModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('bookModal').style.display = 'none';
}

async function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        filterBooks(currentFilter);
    }
}

function addHighlight(value = '') {
    const container = document.getElementById('highlightsContainer');
    const highlightDiv = document.createElement('div');
    highlightDiv.className = 'highlight-item';
    highlightDiv.innerHTML = `
        <input type="text" placeholder="Enter highlight..." value="${value}">
        <button type="button" class="highlight-remove" onclick="removeHighlight(this)">×</button>
    `;
    container.appendChild(highlightDiv);
}

function removeHighlight(button) {
    button.parentElement.remove();
}

function clearHighlights() {
    document.getElementById('highlightsContainer').innerHTML = '';
}

function getHighlights() {
    const inputs = document.querySelectorAll('#highlightsContainer input');
    return Array.from(inputs)
        .map(input => input.value.trim())
        .filter(value => value.length > 0);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const difficulty = document.getElementById('bookDifficulty').value;
    const rating = parseFloat(document.getElementById('bookRating').value);
    const description = document.getElementById('bookDescription').value;
    const highlights = getHighlights();
    const categories = [];
    const categoryCheckboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked');
    categoryCheckboxes.forEach(checkbox => {
        categories.push(checkbox.value);
    });
    if (categories.length === 0) {
        alert('Please select at least one category.');
        return;
    }
    const bookData = {
        title,
        author,
        difficulty,
        rating,
        description,
        highlights,
        categories
    };
    if (currentEditingId) {
        await fetch(`${API_URL}/${currentEditingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
    } else {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        });
    }
    closeModal();
    filterBooks(currentFilter);
}

async function clearDatabase() {
    if (confirm('Are you sure you want to clear all books? This cannot be undone.')) {
        await fetch(API_URL, { method: 'DELETE' });
        filterBooks(currentFilter);
    }
}

async function exportData() {
    const books = await fetchBooks();
    const data = JSON.stringify(books, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'programming-books.json';
    a.click();
    URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', function() {
    renderBooks();
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const category = this.getAttribute('data-filter');
            filterBooks(category);
        });
    });
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', searchBooks);
    // Modal functionality
    const modal = document.getElementById('bookModal');
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    // Form submission
    document.getElementById('bookForm').addEventListener('submit', handleFormSubmit);
});
