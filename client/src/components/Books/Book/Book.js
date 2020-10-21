import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadBooks } from "../../../redux/actions/bookActions";
import { loadGenres } from "../../../redux/actions/genreActions";
import { Spinner } from "../../common/Spinner";
import { toast} from "react-toastify";

const newBook = {
  id: null,
  title: "",
  summary: "",
  author: "",
  language: "",
  genreId: null,
  url: ""
};

const _Book = ({
  books,
  genres,
  loadBooks,
  loadGenres,
  history,
  ...props
}) => {
  const [book, setBook] = useState({ ...props.book });
  const genre = genres.filter(genre => genre.id === book.genreId);

  useEffect(() => {
    if (books.length === 0) {
      loadBooks().catch(error => {
        toast.error("Loading books failed. " + error.message, { autoClose: false });
      });
    } else {
      setBook({ ...props.book });
    }    
  }, [props.book]);

  useEffect(() => {
    if (genres.length === 0) {
      loadGenres().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [])

  const editBook = (book) => {
    history.push(`/edit/${book.slug}`)
  }

  return (
    <div>
      { props.loading ? 
        <Spinner />
        :
        <div className="card border-dark mb-3">
          <div className="card-header">{book.title}</div>
          <div className="card-body text-dark">
            <h6 className="card-title">Author: {book.author}</h6>
            <h6 className="card-title">Language: {book.language}</h6>
            <h6 className="card-title">Genre: {genre.length > 0 ? genre[0].name : ''}</h6>
            <p className="card-text">{book.summary}</p>
            <a href={book.url}>Buy here</a>
          </div>
          <button
            className="btn btn-primary w-25 m-4"
            onClick={() => editBook(book)}
          >
            Edit
          </button>
        </div>
      } 
    </div>
  );
}

export const getBookBySlug = (books, slug) => {
  return books.find(book => book.slug === slug) || null;
}

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const book =
    slug && state.books.length > 0
      ? getBookBySlug(state.books, slug)
      : newBook;

  return {
    book: book,
    books: state.books || [],
    genres: state.genres || [],
    loading: state.status.loading || false
  };
}

const mapDispatchToProps = {
  loadBooks,
  loadGenres
};

export const Book = connect(mapStateToProps, mapDispatchToProps)(_Book);
