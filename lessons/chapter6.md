# Redux

Redux is a state management system that can be used to manage data flow within your application. Redux library helps in keeping the application's state in a global position, allows the components to subscribe to the various states and the methods (actions) to handle those states.

## Why redux and when it is helpful v/s useContext

While the React application can be written without Redux, there are certain scenarios when Redux can be immensly helpful. If the application has complex data, each representing different parts of the application and there are several components which needs the same data, and they donot necessarily belong to the same parent, then Redux is the best way to handle the data, and any updates to the data.

## Core principles of redux

Redux works on the basis of 3 core principles:

- Immutable store: The data present in the redux store is immutable and one cannot simply override the data. Any updates done to the state must be a new state that is created and update in the store. The state cannot be changed directly and such changes can only happen via actions.

- Action triggers changes: The way a component updates the `state` by using `setState`, in redux, any updates to the state must be done via `Actions`. The component subscribing to the `actions` will dispatch them based on an user interaction, and these `Actions` are the methods that perform any required API calls, and provide new data that must be updated.

- Reducers update state: The sole purpose of the reducers is to update the state in an immutable manner, based on the data that is given to the reducer by the Action.

## Redux data flow

Redux has a unidirectional data flow. 

1. The components subscribe to the data they want to use or listen to. These components will recieve the data in the form of `props`.
2. The components will dispatch actions whenever there is a need for any data updation. This will cause the action to do any required computations or make API calls.
3. The action will then send the new data to be updated to an appropriate reducer. The Reducer will then intrepret this data and update it immutable in the state.
4. The components subscribed to the data will be now re rendered with new data.

## Adding Redux to React

Add the basic redux setup by installing `redux` and `react-redux` packages. Run the commands `yarn add redux` and `yarn add react-redux` in the terminal. Create a new folder `/redux` under `/src`. This folder will contain all the actions and the reducers required by the application. Create two folders underneath the `/redux` folder, `/actions` and `/reducers`.

- **Actions**: The `/actions` folder will contain two types of code, `actionTypes` which will tell the reducer which action has been dispatched, and the actual `methods` that will perform the computations reqiured.

Create a new file `actionTypes.js` under `/actions` folder, and add the following code: 

```javascript
export const LOAD_BOOKS_SUCCESS = "LOAD_BOOKS_SUCCESS";
```

This is just one action type that is being added now. This file will be updated to add more actions as the course progresses.

Create a new file `bookActions.js` under the `/actions` folder. The `bookActions` file will perform the API calls and get the data and call the reducers. Add the following lines of code under the file. This file will also be updated further on to add more functionality.

```javascript
import * as types from "../actions";

export const loadBookSuccess = () => {
  return { type: types.LOAD_BOOKS_SUCCESS, books: [] };
}

export const loadBooks = () => {
  return function(dispatch) {
    return dispatch(loadBookSuccess());
  };
}
```

The `bookActions.js` has two actions, `loadBookSuccess` which will call the reducer, and `loadBooks` which will make the API calls.

- **Reducers**: The `/reducer` folder will contain methods that will check of a particular type of action dispatched and update the state accordingly. Create a new file `bookReducer.js` under `/reducer` folder and the below code:

```javascript
import * as types from "../actions/actionTypes";

export const bookReducer = (state = [], action) => {
  switch (action.type) {
    case types.CREATE_BOOK_SUCCESS: 
      return [...state, { ...action.book }];
    default:
      return state;
  }
}
```

The `bookReducer` is a method that takes two parameters, `state` and `action`. The `state` will be the existing state of the application, if the app is being loaded for the first time, this will be empty and will be assgined with empty array `state=[]`. If there is any data provided in the `initialState` while **configuring the store**, then that data will be reflected here. The details on `initalState` and `configureStore` is given below. The common practice used while creating a reducer is to use a switch statement on the `action.type` and then match the type with the type of action that is dispatched. Any data that is sent to the reducer will be sent as one of the values under the `action`. Use the data sent to update the `state` immutably. `[...state, { ...action.book}]` will update the book with the new data that is sent. The `default` case will just return the existing state without updating it.

- **Combine Reducers**: The next step is to combine all the Reducers and provide it to the redux store. Each reducer will handle only one portion of the redux state, and the name of the portion handeled by them is given in the combine reducer. Create a new file `index.js` under `/reducers` folder and add the following code:

```javascript
import { combineReducers } from "redux";
import { bookReducer } from "./bookReducer";

const rootReducer = combineReducers({
  books: bookReducer
});

export  { rootReducer };
```

The `combineReducers` method given by `redux` will create an initial store containing various data required by the application. This is futher exported as `rootReducer`. 

- **Configure store**: The final step is to configure store and add Redux provider to the application. Create a new file `configureStore.js` under the `/redux` folder and add the code below:

```javascript
import { createStore, compose } from "redux";
import { rootReducer } from "./reducers";

export const configureStore = (initialState) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers()
  );
}
```

`createStore` takes in 3 parameters, the `reducers` used in the application, `initialState` required by the app, and any `middlewares` that needs to be added to redux. At the stage, no middlewares are added. However, `composeEnhancers` are used to provide a dev tool extension in the development. The redux dev tool extension that can be added in the browser for debugging purposes will make use of `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__`.

Once this is ready, next step is to add the configured store to the root of the application. Go to the `index.js` file in the root of the project and add the store and provider from redux.

```javascript
import { configureStore } from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);
```

Now the application is ready to use redux. Create an end to end flow with redux. Go to => [Chapter7](/lessons/chapter7.md)