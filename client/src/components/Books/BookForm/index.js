import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadBooks, saveBook } from '../../../redux/actions/bookActions';
import { loadGenres } from '../../../redux/actions/genreActions';
import { useModal } from '../../hooks/useModal';
import { InputText } from '../../common/InputText';
import { Summary } from '../Summary';
import { InputSelect } from '../../common/InputSelect';
import { Modal } from "../../common/Modal";
import { Spinner } from '../../common/Spinner';
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
  saveBook,
  loadGenres,
  history,
  ...props
}) => {
  const [book, setBook] = useState({ ...props.book });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const inputRef = useRef({});
  const { isOpen: showSummary, toggle: toggleSummary } = useModal();

  useEffect(() => {
    if (books.length === 0) {
      loadBooks().catch(error => {
        toast.error("Loading books failed. " + error.message, { autoClose: false });
      });
    } else {
      setBook({ ...props.book })
    }
  }, [props.book]);

  useEffect(() => {
    if (genres.length === 0) {
      loadGenres().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  const formIsValid = () => {
    const errors = {};
    Object.keys(inputRef.current).forEach((key) => {
      if(inputRef.current[key].value === '') {
        errors[key] = `${key} is required`
      };
    })

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: name === "genreId" ? parseInt(value) : value
    }));
  }

  const handleSummary = (value) => {
    setBook(prevBook => ({
      ...prevBook,
      summary: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveBook(book)
      .then(() => {
        toast.success("Book saved.");
        history.push("/");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    <div>
      { props.loading ? <Spinner /> : 
      <form onSubmit={handleSubmit}>
      <InputText 
        id="title"
        name="title"
        title="Book Title"
        value={book.title}
        handleChange={handleChange}
        placeHolder="Book Title"
        error={errors.title}
        />
      <div className="form-group row m-0">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <button type="button" className="btn btn-light w-100" onClick={toggleSummary}>
            {book.summary  ? <span>Edit Summary</span> : <span>Add Summary</span>}
          </button>
          <Modal isOpen={showSummary} toggle={toggleSummary}>
            <Summary 
              toggleSummary={toggleSummary}
              showSummary={showSummary}
              id="summary"
              name="summary"
              value={book.summary}
              handleSummary={handleSummary} />
          </Modal>
        </div>
      </div>
      <InputSelect
        id="genre"
        name="genreId"
        label="Genre"
        value={book.genreId}
        defaultOption="Select Genre"
        handleChange={handleChange}
        error={errors.genreId}
        options={genres}
      />
      <InputText 
        id="author"
        name="author"
        title="Author Name"
        value={book.author}
        handleChange={handleChange}
        placeHolder="Author Name"
        error={errors.author}
        />
      <InputText 
        id="language"
        name="language"
        title="Language"
        value={book.language}
        handleChange={handleChange}
        placeHolder="English"
        error={errors.language}
        />
      <InputText 
        id="url"
        name="url"
        title="Link to buy"
        value={book.url}
        handleChange={handleChange}
        placeHolder="https://example.com"
        error={errors.url}
        />
      <div className="form-group row m-0 mt-4">
        <div className="col-sm-6">
          <button type="submit" className="btn btn-primary w-100" disabled={saving}>{saving ? "Saving..." : "Save"}</button>
        </div>
      </div>
    </form>}
      
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
  saveBook,
  loadGenres
};

export const BookForm =  connect(mapStateToProps, mapDispatchToProps)(_BookForm);
 