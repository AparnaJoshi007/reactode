import * as types from "../actions";
import * as bookApi from "../../api/bookApi";
import { beginApiCall, apiCallSuccess, apiCallError } from "./statusActions";

export const loadBookSuccess = (books) => {
  return { type: types.LOAD_BOOKS_SUCCESS, books };
}

export const createBookSuccess = (book) => {
  return { type: types.CREATE_BOOK_SUCCESS, book }
}

export const updateBookSuccess = (book) => {
  return { type: types.UPDATE_BOOK_SUCCESS, book };
}

export const deleteBookOptimistic = (id) => {
  return { type: types.DELETE_BOOK_OPTIMISTIC, id };
}

export const loadBooks = () => {
  return function(dispatch) {
    dispatch(beginApiCall());
    return bookApi
      .getBooks()
      .then(books => {
        dispatch(loadBookSuccess(books));
        dispatch(apiCallSuccess());
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export const saveBook = (book) => {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return bookApi
      .saveBook(book)
      .then(savedBook => {
        book.id
          ? dispatch(updateBookSuccess(savedBook))
          : dispatch(createBookSuccess(savedBook));
        dispatch(apiCallSuccess());
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export const deleteBook = (id) => {
  return function(dispatch) {
    dispatch(deleteBookOptimistic(id));
    return bookApi.deleteBook(id);
  };
}