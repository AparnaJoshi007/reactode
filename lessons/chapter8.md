## Async with redux - part1 (Home Page)

Async capabilities should be added to Redux as a real application would load the data via API calls. This requires two steps. 

1. Creating a Mock API setup for the project
2. Adding a middleware to redux to handle async operations


## Mock API setup

First step that should be taken is addition of a Mock API. Go outside the `/client` folder where all the React application code is present. Create a new folder `/server` and copy paste all the files present under the following path: [Github](https://github.com/AparnaJoshi007/reactode/tree/master/server). Run `yarn install json-server`. Add the following scripts to the main `package.json` file:

```javascript
"scripts": {
    "prestart:api": "node server/createMockDb.js",
    "start:api": "node server/apiServer.js",
    "start": "cd client && yarn start",
    "build": "cd client && yarn build"
  },
```

These scripts will take care of creating some mock data for the application and also running a mock API server.

Run the command `yarn prestart:api`, this will create a `db.json` file, from which the data will be read. Run the command `yarn start:api` to start the API on port 3001. Now the mock API is ready to be used.

## Adding redux-thunk

The action creators provided via Redux can only return an `object`. This means, if there is an async API call, and a promise should be returned from the actions, it cannot be implemented directly in  Redux. However, there are several middlewares to serve this purpose. Thunk is one such middleware that can be used with redux which helps in handling the async API calls by providing the ability to return functions or promises from the actions. Add `redux-thunk` to the project by installing it.

Run the command `yarn add redux-thunk` in the terminal. This will install thunk and its dependencies. Next step is to configure redux to use `redux-thunk` as a middleware. Middleware is nothing but a function that intercepts the other function calls and it is executed before any other operations take place. Modify the `configureStore.js` file in the `/redux` folder and add the following lines of code.

```javascript
import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";

export const configureStore = (initialState) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
```

The redux store is configured to use `thunk` with the help of `applyMiddleware` higher order function. Now the API calls in the actions can be modifed such that they return a promise that gets resolved once the API call returns the value.

## Display books from API

The MockAPI server and Redux thunk is now configured into the project. The `Home` page can be now modified to utilize these APIs to get list of books to be displayed. This will be done in 3 steps.

1. **Add the methods to make raw API calls and return data**: Create a new folder `/api` under the `/src` folder and copy paste the files in the following path: [Github](https://github.com/AparnaJoshi007/reactode/tree/master/client/src/api). These functions are used purely to make API calls to the server with relevant data and doesn't depend on the React implementation. It is possible to completely avoid using this methods and one can directly make `fetch` calls from redux actions. To simplify the code and avoid writing the `fetch` calls repeatedly, this will be kept within the `/api` folder.

2. **Modify `bookActions.js` file to make API calls**: The `bookActions.js` currently has only one action creator that is providing the hardcoded data. Add another method to make the API call and then call the action creator once the API call returns the data.

```javascript
import * as types from "../actions/actionTypes";
import * as bookApi from "../../api/bookApi";

export const loadBookSuccess = (books) => {
  return { type: types.LOAD_BOOKS_SUCCESS, books };
}

export const loadBooks = () => {
  return function(dispatch) {
    return bookApi
      .getBooks()
      .then(books => {
        dispatch(loadBookSuccess(books));
      })
      .catch(error => {
        throw error;
      });
  };
}
```

Once redux thunk is added to the project, it provides two parameters to all actions. `getState` and `dispatch`. The `getState` method can to used to obtain the data in the application. `dispatch` method is used to call other action creators. The `loadBooks` method will first make an API to `getBooks()`, once the data is returned it dispatches the action creator `loadBookSuccess` with the value returned from API.

3. **Modify `Home` page to dispatch action that loads data from API**: 

```javascript
import { loadBooks } from '../../redux/actions/bookActions';


const mapDispatchToProps = (dispatch) => ({
  loadBooks: () => dispatch(loadBooks())
});
```

Modify the import statement to load the books from the API call, that is being handled by `loadBooks` action. Once the data starts getting loaded from API, the home page should look as shown below

<img src="https://i.imgur.com/xO2vEgk.png" alt="homepage" />

## Multiple API calls from Page

The current project is displaying list of books, however, these books also belong to a particular genre, and the details of the genre also needs to be loaded. The same scenario can be applied to other applications as well, when multiple resources should be loaded before displaying the data on a page. The `useEffect` method in the `Home` page can be modified to make two API calls, for fetching books and genres respectively.

```javascript
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadBooks } from '../../redux/actions/bookActions';
import { loadGenres } from '../../redux/actions/genreActions'; 
import { BookList } from '../Books/BookList';

const _Home = ({
  books,
  genres,
  loadBooks,
  loadGenres,
}) => {

  useEffect(() => {
    if (books.length === 0) {
      loadBooks().catch(error => {
        console.log("Loading books failed", error)
      });
    }

    if (genres.length === 0) {
      loadGenres().catch(error => {
        console.log("Loading genres failed", error)
      });
    }
  }, []); 

  return (
    <>
      <div className="jumbotron">
        <h1>Dashboard</h1>
        <p>Find all your books here.</p> 
      </div>
      {books.length > 0 && <BookList books={books} genres={genres} onDeleteClick={() => {/* do something */}} />} 
    </>
  );
}

const mapStateToProps = (state) => ({
  books: state.books || [],
  genres: state.genres || []
});

const mapDispatchToProps = (dispatch) => ({
  loadBooks: () => dispatch(loadBooks()),
  loadGenres: () => dispatch(loadGenres())
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(_Home);
```

This is making a call to fetch `genres` from `loadGenres` action, however, the action and the reducer is not created yet. To add any new redux flow, follow 4 steps:

1. **Add the action type for `loadGenre` action**: Modify the `/redux/actions/actionTypes.js` file, and add a new entry for `loadGenres` action type.
```javascript
export const LOAD_GENRES_SUCCESS = "LOAD_GENRES_SUCCESS";
``` 
2. **Add the new action and make API call**: Add a new file `genreActions.js` under `/redux/actions` folder. This file will be similar to `bookActions.js`, except the genre API will be called. Add the following lines of code under it:

```javascript
import * as types from "./actionTypes";
import * as genreApi from "../../api/genreApi";

export const loadGenresSuccess = (genres) => {
  return { type: types.LOAD_GENRES_SUCCESS, genres };
}

export const loadGenres = () => {
  return function(dispatch) {
    return genreApi
      .getGenres()
      .then(genres => {
        dispatch(loadGenresSuccess(genres));
      })
      .catch(error => {
        throw error;
      });
  };
}
```

3. **Add reducer to update the genre state**: The `genres` data will stay under a separate state. The application will now have two states : `books` and `genres`. A new reducer should be added to provide this new state to redux. Create a new file under `/redux/reducers` and add `genreReducer.js` file under it. Add the following code:

```javascript
import * as types from "../actions/actionTypes";

export const genreReducer = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_GENRES_SUCCESS:
      return action.genres;
    default:
      return state;
  }
}
```

4. **Add the newly created reducer under combine reducers in the root reducer file**: Any reducer created must be added under the root reducer, and only then, the redux will recognize it to be a valid state and allow the components to subscribe to it. Modify the file `index.js` under `/redux/reducers` folder and add the following code:

```javascript
import { combineReducers } from "redux";
import { bookReducer } from "./bookReducer";
import { genreReducer } from "./genreReducer";

const rootReducer = combineReducers({
  books: bookReducer,
  genres: genreReducer,
});

export  { rootReducer };
```

Now the Homepage should automatically reload and display all the relevant data of books. Currently the link to open and display the details of a book and `delete` option are now working. These features will be added in the coming chapters. If everything is followed through correctly until this point, the Homepage should be loaded and should look as below.

<img src="https://i.imgur.com/xEYrmzn.png" alt="homepage" />