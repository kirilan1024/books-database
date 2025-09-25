



![GitHub Repo Size](https://img.shields.io/github/repo-size/kirilan1024/books-database)
![GitHub Last Commit](https://img.shields.io/github/last-commit/kirilan1024/books-database)
![GitHub License](https://img.shields.io/github/license/kirilan1024/books-database)

# Programming Books Database
## Screenshot


<p align="center">
   <img src="screenshot.png" alt="App Screenshot" width="700"/>
</p>


A modern web app to manage and discover essential programming books. This project is split into a frontend (static HTML/CSS/JS) and a backend (Node.js/Express REST API).

## Features
- Browse, search, filter, add, edit, and delete programming books
- Book details: title, author, difficulty, rating, description, highlights, categories
- Responsive, modern UI
- Data export (JSON)
- Backend API for persistent data
- Error message if backend is unreachable

## Project Structure
```
books-database/
├── backend/         # Node.js/Express backend API
│   ├── server.js
│   ├── package.json
│   └── ...
├── frontend/        # Static frontend (HTML, CSS, JS)
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .gitignore
└── README.md
```

## Getting Started

### Backend
1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Start the backend server:
   ```sh
   npm start
   ```
   The API will be available at `http://localhost:3001/api/books`.

### Frontend
1. Open `frontend/index.html` in your browser.
   - For best results, use a local server (e.g. `npx serve frontend` or VS Code Live Server extension).
2. The app will connect to the backend API for all book data.

## API Endpoints
- `GET    /api/books`         — List all books
- `GET    /api/books/:id`     — Get a single book
- `POST   /api/books`         — Add a new book
- `PUT    /api/books/:id`     — Update a book
- `DELETE /api/books/:id`     — Delete a book
- `DELETE /api/books`         — Delete all books

## Customization
- To seed with your own books, edit the `seedInitialData()` function in `backend/server.js`.
- To change categories, update the frontend checkboxes and backend data accordingly.


## License
MIT

## Components & Dependencies

| Component      | Version      | Copyright / Author         | License   | Source URL |
|----------------|--------------|----------------------------|-----------|------------|
| Node.js        | (your local, e.g. 18.x) | Node.js contributors | MIT       | https://nodejs.org/ |
| Express        | ^4.18.2      | TJ Holowaychuk, Express contributors | MIT | https://expressjs.com/ |
| cors           | ^2.8.5       | Troy Goode                | MIT       | https://github.com/expressjs/cors |
| body-parser    | ^1.20.2      | TJ Holowaychuk, Douglas Christopher Wilson | MIT | https://github.com/expressjs/body-parser |
| shields.io     | N/A (web API)| Shields.io contributors   | CC0-1.0   | https://shields.io/ |
| Vanilla JS     | ES6+         | ECMAScript authors        | (Spec)    | https://developer.mozilla.org/en-US/docs/Web/JavaScript |
| HTML5/CSS3     | N/A          | W3C                       | (Spec)    | https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5 |
| GitHub Copilot | N/A          | GitHub                    | Proprietary | https://github.com/features/copilot |
| MIT License    | N/A          | Open Source Initiative    | MIT       | https://opensource.org/licenses/MIT |

**License Compatibility:**  
All runtime dependencies are MIT or more permissive (CC0), so you can safely license your project as MIT. There are no copyleft or restrictive licenses in your stack. GitHub Copilot is not a runtime dependency and does not affect your project’s license.

---

Made with ❤️ by [kirilan1024](https://github.com/kirilan1024) and GitHub Copilot
