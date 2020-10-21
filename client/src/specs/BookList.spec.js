import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { cleanup, render, fireEvent } from '@testing-library/react';
import { BookList } from '../components/Books/BookList';

afterEach(cleanup);
const onDeleteClick = jest.fn();

const renderBookList = (args) => {
  let defaultProps = {
    genres: [],
    books: [],
    onDeleteClick
  }

  const props = { ...defaultProps, ...args };
  return render(<Router><BookList {...props} /></Router>);
}

it('should render BookList', () => {
  const { getByText } = renderBookList();
  getByText("Title")
});

it('should render BookList with the given data', () => {
  const { getByText } = renderBookList({
    genres: [{id:1, name:'suspense'}],
    books: [{id:1, title:'title', genreId: 1}]
  });
  getByText("suspense")
});


it('should delete a book from BookList', () => {
  const { getByText } = renderBookList({
    genres: [{id:1, name:'suspense'}],
    books: [{id:1, title:'title', genreId: 1}]
  });
  fireEvent.click(getByText("Delete"));
  expect(onDeleteClick).toBeCalledWith(1);
});


