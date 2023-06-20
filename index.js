const express = require('express');

const books = require('./resources/books/books.router');

const loggerRequest = require('./middlewares/logger-request');

const app = express();

app.use(loggerRequest);
app.use(express.json());
app.use('/api/v1/books', books);

let port = process.env.NODE_ENV === 'production' ? process.env.PORT : 1000;

app.listen(port, () => console.log(`Listenning on port ${port} `));
