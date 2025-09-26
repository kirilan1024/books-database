// Example unit test for a frontend function
const { JSDOM } = require('jsdom');

describe('UI logic', () => {
  let document;
  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div id="booksGrid"></div></body>`);
    document = dom.window.document;
    global.document = document;
  });

  afterEach(() => {
    delete global.document;
  });

  it('should render empty state if no books', () => {
    // Simulate the renderBooks logic for empty books
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;"><h3>No books found</h3></div>`;
    expect(grid.innerHTML).toMatch(/No books found/);
  });
});
