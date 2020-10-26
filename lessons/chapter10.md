## Loader and error handling

The actions types and the actions creators will be modified to keep track of when an API call is being made. This is done by adding a `statusAction` creator, that would be dispatched everytime an API call is in progress.

1. **Update actionTypes**: Include action types for `start`, `success` and `error` states of an API call. Any API call made by the component will check for the status to update the UI. Modify `actionTypes.js` file under `/redux/actions` folder

```javascript
export const LOAD_BOOKS_SUCCESS = "LOAD_BOOKS_SUCCESS";
export const LOAD_GENRES_SUCCESS = "LOAD_GENRES_SUCCESS";
export const CREATE_BOOK_SUCCESS = "CREATE_BOOK_SUCCESS";
export const UPDATE_BOOK_SUCCESS = "UPDATE_BOOK_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";
export const API_CALL_SUCCESS = "API_CALL_SUCCESS";
```

2. **Add new `statusAction`**: Now the actions that would dispatch relevant status value should be created. Create a new file `statusActions.js` and add the following code.

```javascript
import * as types from "./actionTypes";

export const beginApiCall = () => {
  return { type: types.BEGIN_API_CALL };
}

export const apiCallSuccess = () => {
  return { type: types.API_CALL_SUCCESS };
}

export const apiCallError = () => {
  return { type: types.API_CALL_ERROR };
}
```

The actions `beginApiCall`, `apiCallSuccess` and `apiCallError` will be used by the other action creators to manage the API call status.

3. **Add the `statusReducer`**: New status reducer should be created with file `statusReducer.js` under `/redux/reducers` folder. 

```javascript
import * as types from "../actions";

export const statusReducer = (state = false, action) => {
  switch (action.type) {
    case types.BEGIN_API_CALL: 
      return { ...state, loading: true };
    case types.API_CALL_SUCCESS:
      return { ...state, loading: false };
    case types.API_CALL_ERROR:
      return { ...state, loading: false };
    default:
      return state;
  }
}
```

4. Modify the `index.js` file under `/redux/reducers` folder to combine status reducer.

```javascript
import { statusReducer } from "./statusReducer";

const rootReducer = combineReducers({
  // dont modified
  status: statusReducer
});
```

## Update existing API calls to use the status action creators

Go to the `bookActions.js` and `genreActions.js` files. Import the methods from `statusActions.js` file. 

1. `beginApiCall` will be dispatched when the API call starts.
2. `apiCallSuccess` will be dispatched upon success.
3. `apiCallError` will be dispatched upon error.

The below example is shown on `loadBooks` action under `bookActions.js` file. Please modify all the other actions to reflect the same

```javascript
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
```

Modify `Home` page to include the loading status. The below exmaple is only shown for `Home` page. Please modify `BookForm` page and `Book` page accordingly

```javascript
// import Spinner
import { Spinner } from '../common/Spinner';

// Change the render to display spinner when the component is Loading
{
  props.loading ?
    <Spinner />
    :
    <BookList books={books} genres={genres} onDeleteClick={handleDeleteBook} />
}  

// Add loading status to mapStateToProps

const mapStateToProps = (state) => ({
  books: state.books || [],
  genres: state.genres || [],
  loading: state.status.loading || false
});
```

When you refresh the page, the following spinner will be seen

<img src="https://i.imgur.com/vquyWJb.png" />


## Error handling.

Install the package `react-toastify` to toast any error messages that might result from an API call. `yarn add react-toastify`.

The errors that were being logged to the console can now be toasted using

```javascript
import { toast } from "react-toastify";

  toast.error("Loading books failed. " + error.message, { autoClose: false });
```

Final step in the application would be to add Deletion capability to the books. Go to [Chapter11](/lessons/chapter11.md)