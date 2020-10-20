import React from 'react';
import { BookTile } from '../BookTile';

const BookList = ({ books, genres, onDeleteClick }) => (
  <table className="table">
  <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Language</th>
      <th>Genres</th>
      <th />
      <th />
    </tr>
  </thead>
  <tbody>
    {
      books.map((book, key) => {
        return (
          <BookTile key={key} {...book} genres={genres} onDeleteClick={onDeleteClick} />
        )
      })
    }
  </tbody>
  </table>
)

export { BookList };
