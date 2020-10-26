## Container v/s Presentational components

The components that make use of redux functionality can be classified into two types:

1. **Container component**: These are the components that directly subscribe to the redux store and redux actions via `mapStateToProps` and `mapDispatchToProps`. 

`mapStateToProps` takes in one parameter, the current state, and provides it to the component as a prop.
`mapDispatchToProps` takes in two parameters, `dispatch` and `ownProps`. The `dispatch` method is used for dispatching actions, and the methods defined under `mapDispatchToProps` are also available via component props. Finally `connect` is a higer order function provided by redux which combines all the state and the actions and provides it to the component.

2. **Presentation component**: These components are also called as dumb components since they dont directly interact with the redux or any other application logic. The components that were added under `/common` folder are all presentation components. They recieve props through the **Container component** and display them.

## Adding a container component 

The `Home` page in the application will be displaying the list of books from an API. This component will act as a Container component, that will load all the books from API and then render them. Before connecting `Home` page to redux, we need 2 presentational components to display the results.

Create a new folder `/BookList` under the `/components/Books` folder and add `index.js` file to it. Copy paste the following lines of code.

```javascript
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
```

This component will get a list of books in the form of array as a prop, and it iterates through the array to display the books. We need another component to display each book.


Create a new folder `/BookTile` under the `/components/Books` folder. Add the `index.js` file to it. 

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

const BookTile = ({
  id,
  title,
  author,
  language,
  genreId,
  url,
  slug,
  genres,
  onDeleteClick
}) => {
  const genre = genres.filter(genre => genre.id === genreId);

  return(
    <tr>
      <td>
        <Link to={"/book/" + slug}>{title}</Link>
      </td>
      <td>{author}</td>
      <td>{language}</td>
      <td>{genre.length > 0 ? genre[0].name : ''}</td>
      <td>
        <a
          className="btn btn-light"
          href={url}
        >
          View
        </a>
      </td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => onDeleteClick(id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export { BookTile };
```

This is also a presentation component that just displays the data given by the `BookList` component.

Modify the `Home` page component to connect to redux for loading the data of the books. Note that the data that will be provided is mocked in the `bookActions.js` file. In the next chapter, this is modified to make an actual API call. Modify `/Home/index.js` file as follows:

```javascript
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadBooksSuccess } from '../../redux/actions/bookActions';
import { BookList } from '../Books/BookList';

const genres = [
  {
    id: 2,
    name: "dummy name"
  }
]

const _Home = ({
  books,
  loadBooks
}) => {

  useEffect(() => {
    if (books.length === 0) {
      loadBooks()
    }
  }, []); 

  return (
    <>
      <div className="jumbotron">
        <h1>Dashboard</h1>
        <p>Find all your books here.</p> 
      </div>
      {books.length > 0 && <BookList books={books} genres={genres} onDeleteClick={() => { /* do something */}} />}
    </>
  );
}

const mapStateToProps = (state) => ({
  books: state.books || [],
});

const mapDispatchToProps = (dispatch) => ({
  loadBooks: () => dispatch(loadBooksSuccess())
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
```

The `Home` page is now importing `import { connect } from 'react-redux';` and `import { loadBooks } from '../../redux/actions/bookActions';` action. The `mapStateToProps` and `mapDispatchToProps` are loading `books` state and `loadBooks` action respectively. When the page is loaded, the following actions take place.

1. `useEffect` will first check if the props `books` is already present in the component. 
2. If `books` array is empty it dispatches an action `loadBooks`. 
3. The `loadBooks` action then sends the hardcoded array `books` to the reducer and the data is then loaded.


Now the home page is displaying hard coded book data. Add asynchronous API calls and fetch real time data. Go to => [Chapter8](/lessons/chapter8.md)