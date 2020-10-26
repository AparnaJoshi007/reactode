## Deletes

To incorporate delete capability, we send the `id` of the book to the API call. The API server will then remove the book from Database and return only the list of books available. The Optimistic delete is used, as in, the UI filters out and removes the book from the list even before API call is successful. This is done to provide better User experience. 

1. **Add the new actionType for delete**:

```javascript
export const DELETE_BOOK_OPTIMISTIC = "DELETE_BOOK_OPTIMISTIC";
```

2. **Create an action for deleting book**:

```javascript
export const deleteBookOptimistic = (id) => {
  return { type: types.DELETE_BOOK_OPTIMISTIC, id };
}

export const deleteBook = (id) => {
  return function(dispatch) {
    dispatch(deleteBookOptimistic(id));
    return bookApi.deleteBook(id);
  };
}
```

3. **Create a recuder for filtering the book via `id` and updating it**:

```javascript
case types.DELETE_BOOK_OPTIMISTIC:
      return state.filter(book => book.id !== action.id);
```

4. **Add the delete capability to `Home` page**:

```javascript
// import deleteBook
import { loadBooks, deleteBook } from '../../redux/actions/bookActions';

// add the deleteBook call
<BookList books={books} genres={genres} onDeleteClick={handleDeleteBook} />

// dispatch deleteBook action via mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  loadBooks: () => dispatch(loadBooks()),
  deleteBook: (id) => dispatch(deleteBook(id)),
  loadGenres: () => dispatch(loadGenres())
});
```

Any further functionalities can be added in a similar fashion to this application. Currently these are the capabilities given to the app. The `create-react-app` comes with preconfigured teste setup with `jest` and `@testing-library/react`. These packages will be next used to write tests to the application. Go to =>  [Chapter12](/lessons/chapter12.md)

