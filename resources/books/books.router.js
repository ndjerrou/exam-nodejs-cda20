const express = require('express');
const {
  getBooks,
  getOneBook,
  addBook,
  deleteOneBook,
  updateOneBook,
  getBooksWithPagination,
} = require('./books.controller');
const checkPayload = require('../../middlewares/checkPayload');
const authDelete = require('../../middlewares/auth-delete');

const router = express.Router();

router.route('').get(getBooks).post(checkPayload, addBook);

router.route('/pages').get(getBooksWithPagination);

router
  .route('/:id')
  .get(getOneBook)
  .delete(authDelete, deleteOneBook)
  .put(updateOneBook);

module.exports = router;
