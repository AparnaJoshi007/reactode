## Async with redux - part 2 (Book Form Page)

The `BookForm` page will be given two distinct capabilities. 
1. Create a new book.
2. Update an existing book.

Modify the file `index.js` under `/Books/BookForm` folder, and add the following lines of code. This will create a layout for a form that contains a couple of input fields required for the book. It also has a `Modal` component which is used to add the book summary. The opening and closing of the modal is handled by the `showSummary` and `toggleSummary`, provided by React's `useState`.

```javascript
import React, { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { InputText } from '../../common/InputText';
import { Summary } from '../Summary';
import { InputSelect } from '../../common/InputSelect';
import { Modal } from "../../common/Modal";

const _BookForm = () => {
  const [book, setBook] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { isOpen: showSummary, toggle: toggleSummary } = useModal();

  const formIsValid = () => {
    const formErrors = {};
    const { title, author, genreId } = book;

    if (!title) formErrors.title = "Title is required.";
    if (!author) formErrors.author = "Author is required";
    if (!genreId) formErrors.genreId = "Genre is required";

    setErrors({ ...formErrors});

    return Object.keys(formErrors).length === 0;
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
    // Submit form
  }

  return (
    <div>
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
        options={[]}
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
    </form>      
    </div>
  );
}

export const BookForm =  _BookForm;
```

## React hook for handling Modal

The opening and closing of Modal to handle summary is handled using `useModal` custom react hook that will be created. The hook will return two values, `isOpen` to handle the opening and closing of modal, and `toggle` to change the current state of modal. Create a new folder `/hooks` under `/components` folder and add the file `useModal.js`. Note that all the custom hooks must begin with the word `use`. Add the following code under `useModal.js`:

```javascript
import { useState } from 'react';

export const useModal = () => {
  const [isOpen, toggleModal] = useState(false);

  function toggle() {
    toggleModal(!isOpen);
  }

  return {
    isOpen,
    toggle,
  }
};
```

## Add summary component

The next step is to add a component which will render a text area inside a Modal. Create a new folder `/Summary` under `/books` folder. Add the following code in `index.js` file.

```javascript
import React, { useRef, useEffect } from "react";
import { TextArea } from '../../common/TextArea';
import { ModalTitle, ModalBody, ModalFooter } from "../../common/Modal";

const Summary = ({ toggleSummary, value, handleSummary }) => {
  const currentSummaryRef = useRef('');

  useEffect(() => {
    if(currentSummaryRef.current) {
      currentSummaryRef.current.focus();
    }
    if (value) {
      currentSummaryRef.current.value = value;
    }
  }, [value])

  return (
    <>
      <ModalTitle handleClick={toggleSummary}>Add book summary</ModalTitle>
        <ModalBody>
          <TextArea
            id="summary"
            placeHolder="Add summary"
            ref={currentSummaryRef} />
        </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" type="submit" onClick={() => { handleSummary(currentSummaryRef.current.value); toggleSummary(); }}>Save</button>
      </ModalFooter>
    </>
  );
};

export { Summary };
```

The `Summary` component an uncontrolled form component. It is designed such that the number of re renders can be reduced. The `useRef` provides reference to the input text area, and the `currentSummaryRef.current.value` will provide the value input by the user. On the click of `save` button, the value present in the ref is saved under the `book` state in `BookForm` component.

## Create book

The `BookFrom` component should be connected to redux to provide methods to create new books. The first thing is to create the necessary actions creators and reducers to create a new book and add to the state.

1. **Create a new action type for Create Book**: Add a new type of action under `actionTypes.js` file. 

```javascript
export const CREATE_BOOK_SUCCESS = "CREATE_BOOK_SUCCESS";
```

2. **Create a new action for `createBook`**: Add the following code to `bookActions.js` file. This will first call the API to save book with the data provided by the user, and then it dispatches the data returned by the API call to the recuder.

```javascript
export const createBookSuccess = (book) => {
  return { type: types.CREATE_BOOK_SUCCESS, book }
}

export const saveBook = (book) => {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    return bookApi
      .saveBook(book)
      .then(savedBook => {
        dispatch(createBookSuccess(savedBook));
      })
      .catch(error => {
        throw error;
      });
  };
}
```

3. **Add redux actions to `BookForm` component**: Modify the `BookForm` component and add the newly created action `saveBook`. The `handleSubmit` function will be called when the user submits the form. The state maintained in the `BookForm` component will have the data added by the user and the same data will be sent to the API.

```javascript
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveBook } from '../../../redux/actions/bookActions';
import { loadGenres } from '../../../redux/actions/genreActions';
import { useModal } from '../../hooks/useModal';
import { InputText } from '../../common/InputText';
import { Summary } from '../Summary';
import { InputSelect } from '../../common/InputSelect';
import { Modal } from "../../common/Modal";

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
  genres,
  saveBook,
  loadGenres,
  history
}) => {
  const [book, setBook] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { isOpen: showSummary, toggle: toggleSummary } = useModal();

  useEffect(() => {
    if (genres.length === 0) {
      loadGenres().catch(error => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  const formIsValid = () => {
    const formErrors = {};
    const { title, author, genreId } = book;

    if (!title) formErrors.title = "Title is required.";
    if (!author) formErrors.author = "Author is required";
    if (!genreId) formErrors.genreId = "Genre is required";

    setErrors({ ...formErrors});

    return Object.keys(formErrors).length === 0;
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
        history.push("/");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return (
    // donot modify
  );
}

const mapStateToProps = (state, ownProps) => ({
  genres: state.genres || []
})

const mapDispatchToProps = {
  saveBook,
  loadGenres
};

export const BookForm =  connect(mapStateToProps, mapDispatchToProps)(_BookForm);
```

- `loadGenre` call is similar to that in `Home` page. 
- The `saveBook` actions that was newly created is now added to the `BookForm` component.

When `handleSubmit` is called, the following course of actions take place:
1. `formValid()` method is called first to check for the validations. This method goes through the values present in the state object `book` and checks if any of the required values are missing. If there are any erorrs, they are added to the `formErrors` variable and then finally adding to the `errors` state object.
2. If the form is valid, `setSaving` is called with `true` to denote the start of API call. This is a trick used to disable the `save` button when the API call is made.
3. The `saveBook` action is now dispatched. This will submit the values entered by the user. Once the API call returns `setSaving` is updated with `false` and the `Home` page is automatically loaded.

Once the create book functionality is added, the app should look somewhat similar to this:

<img src="https://i.imgur.com/Z9EvDos.png" alt="bookfrom" />

## Update book

The update book functionality is given to an existing book whose value needs to be updated. First a route should be added where the user will navigate to when the update is required. This route will uniquely identify a book by its `slug` (URL). The next step is to use the `slug` to fetch the books and display the contents of the relavant book to be updated.

1. **Add a new route `/edit/:slug` that will handle the book updates**: Modify the `App` component to include new route. This route will also render `BookForm` component. However, changes will be made to the component such that it can either handle in creating a new book or update an exisitng book.

```javascript
<Route path="/edit/:slug" component={BookForm} />
```

2. **Modify the `saveBook` action to handle updates**: Go to `bookActions.js` file and modify the saveBook action. The book will create a new book if the `id` of the book is not created yet. If the `id` already exists, the book will simple be updated.

```javascript
export const updateBookSuccess = (book) => {
  return { type: types.UPDATE_BOOK_SUCCESS, book };
}


export const saveBook = (book) => {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    return bookApi
      .saveBook(book)
      .then(savedBook => {
        book.id
          ? dispatch(updateBookSuccess(savedBook))
          : dispatch(createBookSuccess(savedBook));
      })
      .catch(error => {
        throw error;
      });
  };
}
```

3. Add the new action type under `actionTypes.js` file:

```javascript
export const UPDATE_BOOK_SUCCESS = "UPDATE_BOOK_SUCCESS";
```

4. **Modify BookForm component to load the data of the book**: The `slug` from the URL gives details about the URL of the book. This can be used to query the books and filter the book that the user wants to update. Modify the `mapStateToProps` from `BookForm` component, to filer and load a book based on the `slug`. Then add another `useEffect` method to load the list of books from API before the component is mounted.

```javascript
// donot modify other imports
import { loadBooks, saveBook } from '../../../redux/actions/bookActions';

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
  const { isOpen: showSummary, toggle: toggleSummary } = useModal();

  useEffect(() => {
    if (books.length === 0) {
      loadBooks().catch(error => {
        console.log("Loading books failed. ", error);
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
    // donot modify
  }

  const handleChange = (event) => {
    // donot modify
  }

  const handleSummary = (value) => {
    // donot modify
  }

  const handleSubmit = (e) => {
    //donot modify
  }

  return (
    // donot modify
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
    genres: state.genres || []
  };
}

const mapDispatchToProps = {
  loadBooks,
  saveBook,
  loadGenres
};

export const BookForm =  connect(mapStateToProps, mapDispatchToProps)(_BookForm);
```

Once the update is added your added `BookForm` page should look as shown below: (Note the change in the url. `/add` will go to creating a new book, `/edit/:slug` will go to updating an existing book.)

<img src="https://i.imgur.com/PvbK5SF.png" alt="bookfrom" />

## Add Viewbook Page

The books that are stored has more details related to them, and that should be displayed in a separate `Book` page. Create a new folder `Book` under `/Books` folder. Add `index.js` file and add the following code under it:

```javascript
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadBooks } from "../../../redux/actions/bookActions";
import { loadGenres } from "../../../redux/actions/genreActions";

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
        console.log("Loading books failed. " , error);
      });
    } else {
      setBook({ ...props.book });
    }    
  }, [props.book]);

  useEffect(() => {
    if (genres.length === 0) {
      loadGenres().catch(error => {
        alert("Loading genres failed" + error);
      });
    }
  }, [])

  const editBook = (book) => {
    history.push(`/edit/${book.slug}`)
  }

  return (
    <div>
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
    genres: state.genres || []
  };
}

const mapDispatchToProps = {
  loadBooks,
  loadGenres
};

export const Book = connect(mapStateToProps, mapDispatchToProps)(_Book);
```

Add the route under `App` component. It

```javascript
import { Book } from '../Books/Book';

  <Route path="/book/:slug" component={Book} />
```

When the book link is clicked from the `Home` page, it navigates to `/book/:slug` page where all the details of the book is displayed.

If the tutorial is followed through till this point, you can see the following page:

<img src="https://i.imgur.com/R2v2wze.png" alt="book" />

The API calls take some time to return backk data after processing, during this time a loader should be added to give some intuition to the users. Add loader and error handling. Go to => [Chapter10](/lessons/chapter10.md)