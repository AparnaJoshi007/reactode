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

describe("createBookSuccess", () => {
  it("should create a CREATE_BOOK_SUCCESS action", () => {
    //arrange
    const book = books[0];
    const expectedAction = {
      type: types.CREATE_BOOK_SUCCESS,
      book
    };

    //act
    const action = bookActions.createBookSuccess(book);

    //assert
    expect(action).toEqual(expectedAction);
  });
});
