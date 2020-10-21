import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadBooks, deleteBook } from '../../redux/actions/bookActions';
import { loadGenres } from '../../redux/actions/genreActions'; 
import { BookList } from '../Books/BookList';
import { Spinner } from '../common/Spinner';
import { toast } from "react-toastify";

const _Home = ({
  books,
  genres,
  loadBooks,
  loadGenres,
  ...props
}) => {

  useEffect(() => {
    if (books.length === 0) {
      loadBooks().catch(error => {
        toast.error("Loading books failed. " + error.message, { autoClose: false });
      });
    }

    if (genres.length === 0) {
      loadGenres().catch(error => {
        toast.error("Loading genres failed. " + error.message, { autoClose: false });
      });
    }
  }, []); 

  const handleDeleteBook = async (id) => {
    toast.success("Book deleted");
    try {
      await props.deleteBook(id);
    } catch (error) {
     toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      <div className="jumbotron">
        <h1>Dashboard</h1>
        <p>Find all your books here.</p> 
      </div>
      {
        props.loading ?
          <Spinner />
          :
          <BookList books={books} genres={genres} onDeleteClick={handleDeleteBook} />
      }   
    </>
  );
}

const mapStateToProps = (state) => ({
  books: state.books || [],
  genres: state.genres || [],
  loading: state.status.loading || false
});

const mapDispatchToProps = (dispatch) => ({
  loadBooks: () => dispatch(loadBooks()),
  deleteBook: (id) => dispatch(deleteBook(id)),
  loadGenres: () => dispatch(loadGenres())
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
