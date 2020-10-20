import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadBooks } from '../../../redux/actions/bookActions';
import { loadGenres } from '../../../redux/actions/genreActions';
import { useModal } from '../../hooks/useModal';
import { InputText } from '../../common/InputText';
import { Summary } from '../Summary';
import { InputSelect } from '../../common/InputSelect';
import { Modal } from "../../common/Modal";
import { toast } from "react-toastify";

const newBook = {
  id: null,
  title: "",
  summary: "",
  author: "",
  language: "",
  genreId: null,
  url: ""
};

const _BookForm = ({
  books,
  genres,
  loadBooks,
  loadGenres,
  history,
  ...props
}) => {
  const inputRef = useRef([]);
  const [ summary, setSummary ] = useState('');
  const { isOpen: showSummary, toggle: toggleSummary } = useModal();

  const [book, setBook] = useState({ ...props.book });

  useEffect(() => {
    if (books.length === 0) {
      loadBooks().catch(error => {
        toast.error("Loading books failed. " + error.message, { autoClose: false });
      });
    } else {
      setBook({ ...props.book });
    }

    if (genres.length === 0) {
      loadGenres().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, [props.book]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // props.createBook({
    //   title: inputRef.current[0].value,
    //   summary: summary,
    //   genre: inputRef.current[1].value,
    //   authorName: inputRef.current[2].value,
    //   language: inputRef.current[3].value,
    //   url: inputRef.current[4].value,
    // })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputText id="book-title"
          title="Book Title"
          ref={el => inputRef.current[0] = el}
          placeHolder="Book Title"
          />
        <div className="form-group row m-0">
          <div className="col-sm-6 mb-3 mb-sm-0">
            <button type="button" className="btn btn-light w-100" onClick={toggleSummary}>
              {summary  ? <span>Edit Summary</span> : <span>Add Summary</span>}
            </button>
            <Modal isOpen={showSummary} toggle={toggleSummary}>
              <Summary toggleSummary={toggleSummary} showSummary={showSummary} summary={summary} setSummary={setSummary} />
            </Modal>
          </div>
        </div>
        <InputSelect
          name="genres"
          label="Genre"
          ref={el => inputRef.current[1] = el}
          defaultOption="Select Genre"
          options={genres}
        //  error={errors.genres}
        />
        <InputText id="book-author"
          title="Author Name"
          ref={el => inputRef.current[2] = el}
          placeHolder="Author Name"
          />
        <InputText id="book-language"
          title="Language"
          ref={el => inputRef.current[3] = el}
          placeHolder="English"
          />
        <InputText id="book-url"
          title="Link to buy"
          ref={el => inputRef.current[4] = el}
          placeHolder="https://example.com"
          />
        <div className="form-group row m-0 mt-4">
          <div className="col-sm-6">
            <button type="submit" className="btn btn-primary w-100">Save</button>
          </div>
        </div>
      </form>
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
    book: book || {},
    books: state.books || [],
    genres: state.genres || [],
    loading: state.status.loading || false
  };
}

const mapDispatchToProps = {
  loadBooks,
  loadGenres
};

export const BookForm =  connect(mapStateToProps, mapDispatchToProps)(_BookForm);
 