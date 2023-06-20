const express = require('express');
const loggerRequest = require('./middlewares/logger-request');
const authDelete = require('./middlewares/auth-delete');
const app = express();

app.use(loggerRequest);

app.get('*', (_, res) => {
  res.send('express OK');
});

let port = process.env.NODE_ENV === 'production' ? process.env.PORT : 1000;

app.listen(port, () => console.log(`Listenning on port ${port} `));
