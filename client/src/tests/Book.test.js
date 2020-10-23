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
