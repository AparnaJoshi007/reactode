## Testing react

1. **Test `Book` component**: Create a new folder `/tests` under the root of the project. This folder will contain all the unit tests related to the components written. The following code shows how test can be written for `Book` component. Create a new file `Book.test.js`, and add the following code.
```javascript
import React from 'react';
import thunk from "redux-thunk";
import '@testing-library/jest-dom/extend-expect'
import { createMemoryHistory } from 'history'
import { Route, Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider as ReduxProvider } from "react-redux";
import { cleanup, render, fireEvent } from '@testing-library/react';
import { rootReducer } from '../redux/reducers';
import { Book } from '../components/Books/Book';

afterEach(cleanup);

const renderBook = (component, 
  { 
    initialState, 
    store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk))),
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}),
  } = {}) => {
  return render(
    <ReduxProvider store={store}>
      <Router history={history}>
        {component}
      </Router>
    </ReduxProvider>
  );
}

it('should render Book', () => {
  const { getByText } = renderBook(
    <Route path="/book/:slug">
      {props => <Book {...props} />}
    </Route>,
    {
      initialState: {
        genres: [{id:1, name:'suspense'}],
        books: [{id:1, title:'title', author:'collins', genreId:1, slug:'title'}]
      },
      route: '/book/title',
    },
  );
  getByText("Author: collins")
  getByText("Genre: suspense")
});
```

The testing involves the following steps:

- Create the necessary `state` and `routes` that are required by the component. For the `Book` page, an `initialState` of `books` is required. This can be supplied by the test. `createMemoryHistory` can be used for creating a history object and updating it during the test. A route can be updated by calling `createMemoryHistory` with the `route` path.

- The `renderBook` method is taking a component and the relavant store and route data that is required to render the `Book` page. Note that the component is wrapped within the `<Route>`, `<Router>` and `<ReduxProvider>` in the same order. This is necessary for the test as the component will be actually rendered along with the redux and routes. 

- Each test must be written within `it()` block. This is just a convention to be followed when writing tests with `jest`. Any initializations can be done using `beforeEach` and any cleanup can be done using `afterEach`. The above test checks whether the book title and author name was successfully rendered by using `getByText` method given by the `react-testing-library`

2. **Test `Action`**: To provide mock APIs and mock redux store, install two packages. Run `yarn add fetch-mock` and `yarn add redux-mock-store`. `fetch-mock` is dependant on `node-fetch`. So install the `node-fetch` package too.

```javascript
import * as bookActions from "../redux/actions/bookActions";
import * as types from "../redux/actions/actionTypes";
import { books } from "../../../server/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

describe("Load Books Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_BOOKS_SUCCESS when loading books", () => {
      fetchMock.mock("*", {
        body: books,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_BOOKS_SUCCESS, books },
        { type: types.API_CALL_SUCCESS }
      ];

      const store = mockStore({ books: [] });
      return store.dispatch(bookActions.loadBooks()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
```

Testing an actions involves the following steps:

- `fetchMock` is setup to respond to any API route by returning the `books` array. A mock store is also configured using `const middleware = [thunk]; const mockStore = configureMockStore(middleware);`. The next step is to dispatch an action from the `mockStore` and check whether the right action creators were dispatched.

- `store.dispatch(bookActions.loadBooks())` will make an API call to the mockApi. The mockApi returns back the expected books array. Once the array is recieved, the `loadBooks` function will go on to dispatch `LOAD_BOOKS_SUCCESS` and `API_CALL_SUCCESS`. The redux action dispatch can be verified by creating an array of expected actions and checking whether the store recieved those actions.

3. **Test `Reducer`**:
```javascript
import { bookReducer } from "../redux/reducers/bookReducer";
import * as actions from "../redux/actions/bookActions";

it("should add course when passed CREATE_COURSE_SUCCESS", () => {
  // arrange
  const initialState = [
    {
      title: "A"
    },
    {
      title: "B"
    }
  ];

  const newBook = {
    title: "C"
  };

  const action = actions.createBookSuccess(newBook);

  // act
  const newState = bookReducer(initialState, action);

  // assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});
```

Testing reducer can be done as follows:

- Import the actions that must be called. Dispatch these actions with the updated data that will be sent to the reducer.

- Obtain the newState from the reducer by providing `initialState` and `action` parameters. Reducers are nothing but funcitons that take two params and update the value and return it.

- Tests can be now written to check if the `updatedState` reflects the data sent from the  `action`.


## Further enhancements

Congratulations!!! You have successfully completed the **Advanced React course with Redux**. There are some enhancements that can be done on top of the book management software, that could also provide more knowledge and practice into developing applications with React.

- Create a valid list of authors and provide a dropdown select
- Provide a way for users to login and admin capabilities. Only admin should be able to add or edit the books.
- Provide login for common users. Users with login can favorite or archive books.


If you have any questions regarding the development or got stuck at any point, please connect with me on twitter. My twitter handle: @aparna_joshi_ (https://twitter.com/aparna_joshi_)