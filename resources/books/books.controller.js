const { v4: uuidv4 } = require('uuid');

const { readFile, writeFile } = require('../../utils/files');

module.exports = {
  getBooks(req, res) {
    //
    const books = readFile();

    const { sortBy } = req.query;

    if (sortBy) {
      books.sort((a, b) => (a[sortBy] < b[sortBy] ? -1 : 1));
    }

    res.send({ ok: true, data: books });
  },

  getBooksWithPagination(req, res) {
    const books = readFile();

    let { page, count } = req.query;

    page = +page;
    count = +count;

    const startIdx = (page - 1) * count;
    const endIdx = page * count;

    const slicedBooks = books.slice(startIdx, endIdx);

    res.send({
      ok: true,
      data: {
        page,
        perPage: count,
        books: slicedBooks,
      },
    });
  },

  // API Restfull ==> /resource/id
  getOneBook(req, res) {
    const books = readFile();

    const { id } = req.params;

    const book = books.find((book) => book.id === id);

    if (!book)
      return res
        .status(400)
        .send({ ok: false, msg: 'Id provided not correct' });

    res.send({
      ok: true,
      [book ? 'data' : 'msg']: book || 'No books available',
    });
  },

  addBook(req, res) {
    const books = readFile();

    const book = { ...req.body, id: uuidv4() };

    books.push(book);

    writeFile(books);

    res.status(201).send({ ok: true, data: book });
  },

  deleteOneBook(req, res) {
    const books = readFile();

    const { id } = req.params;

    const idx = books.findIndex((book) => book.id === id);

    if (idx === -1)
      return res.status(400).send({ ok: false, msg: 'Wrong id provided' });

    const deletedBook = books.splice(idx, 1);

    writeFile(books);

    res.send({ ok: true, data: deletedBook[0] });
  },

  updateOneBook(req, res) {
    const books = readFile();

    const { id } = req.params;

    const idx = books.findIndex((book) => book.id === id);

    if (idx === -1)
      return res.status(400).send({ ok: false, msg: 'Wrong id provided' });

    let updatedBook = null;

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        const book = {
          ...book,
          ...req.body,
        };

        updatedBook = book;
      }
      return book;
    });

    writeFile(updatedBooks);

    res.send({ ok: true, data: updatedBook });
  },
};
