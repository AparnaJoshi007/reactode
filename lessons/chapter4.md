## Initial app structure

- Use create-react-app 
- Structure of app
- Components -> Home, Add, etc
- common -> header
- Add router
## Add routes and Create pages

The react application will have multiple routes to handle different parts of the application. The next step is to add routes to the application. `React-router` provides a set of components using which routing can be added to the application. 

Run `yarn add react-router-dom` to install the router in your application.

**React router** provides 4 main components to add routing to the application:

1. **`<Router>`**: This is the root component which provides the routing facility and the routing parameters to all the components under it. Any component which must be rendered as part of a route must be included as the child of this component. This component is usually added at the route of the application.
2. **`<Switch>`**: This component renders only the first route that is matched. If we donot use `Switch`, all the matching routes will be rendered.
3. **`<Route>`**: This component takes in the value of the route to be matched, and the component to be rendered upon matching the given route and renders it.
4. **`<Link>`**: This component helps in providing the internal navigation between different pages without relaoding the page.

Now create pages to render when the router matches any given route:
- **Create Home Page** by adding a folder `/Home` under the `/components` folder, and create the file `index.js`. This is just a convention that will be followed in the project. All the components will be written inside a separate folder. Add the following lines of code under `/Home/index.js` file.

```javascript
// /Home/index.js
import React from 'react';

const _Home = () => {
  return (
    <>
      <div className="jumbotron">
        <h1>Dashboard</h1>
        <p>Find all your books here.</p> 
      </div> 
    </>
  );
}

export const Home = _Home;
```
This file currently contains a simple component rendering a header and a paragraph. This file will be modified later to add more functionality. 

```
A a folder `/Books` under the `/components` folder. The `/Books` folder will contain all the necessary components related to Creating, Updating and Displaying the detials of a book.
``` 

- **Create BookForm Page** by adding `/BookForm` folder under the `/Books` folder. Create the file `index.js` and add the following code.

```javascript
import React, { useState } from 'react';

const _BookForm = () => {
  const [book, setBook] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBook(prevBook => ({
      ...prevBook,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="col col-form-label">Book Title</label>
        <div className="col-sm-12">
          <input type="text" className='form-control' id='title' name='title' value={book.title} onChange={handleChange} placeholder="Enter the title" />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="author" className="col col-form-label">Book Author</label>
        <div className="col-sm-12">
          <input type="text" className='form-control' id='author' name='author' value={book.author} onChange={handleChange} placeholder="Author name" />
        </div>
      </div>
      <div className="form-group row m-0 mt-4">
        <div className="col-sm-6">
          <button type="submit" className="btn btn-primary w-100" >Save</button>
        </div>
      </div>
    </form>
    </div>
  );
}

export const BookForm =  _BookForm;
```

The `BookForm` component is rendering a form, containing two input fields. This is a controlled component where in the data present in the input field is managed by the `state` of the component. The component is making use of the react hook `useState`, which provides the functionality of adding `state ` to a functional component. The `useState` returns two arguments, the state variable (`book`) and the function to set the state variable (`setBook`). 

The state variable `book` in the `BookForm` component is an object `const [book, setBook] = useState({});`, that will hold the details of a book. Currently it holds the data corresponding to two keys: `title` and `author`. In the input element `value={book.title}` will provide the value of the `title` of the book, `name="title"` will control the key using under which this value is stored.

Each input element also has the `handleChange` function which gets triggered when the user interacts with the input element. The `handleChange` function takes the (`{name, value} = event.target`) name and value from the input element. The `setBook` method that is returned from `useState` is called to update the state. The state updation must be immutable, and hence, the existing values of the book object are also added with the help of spread operator `...prevBook,`, and the new value coming from the changes in the input element is updated. The method `setBook` gets the value of the existing state that can be used to maintain the immutability.

- **Create PageNotFound Page** by creating a new folder `/PageNotFound` under the `/components` folder. Add a sample component which should be rendered when user enters an invalid route.

```javascript
import React from "react";

const PageNotFound = () => <h1>Oops! Page not found.</h1>;

export { PageNotFound };
```

- **Add routes** by modifying `App.js` file. This is the root component and we will add two routes to render `Home` page and `BookForm` page. Add the following lines of code in the `App.js` file.

```javascript
import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Home } from '../Home';
import { BookForm } from '../Books/BookForm';
import { PageNotFound } from '../PageNotFound';
import './App.css';

const App = () => {
  return (
    <div className="page-content-wrapper">
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={BookForm} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
```

The `<Route>` component takes to props, `path` and `component`. Since the `/` route will match with any possible routes, `exact` prop should be passed to the component so that the `Home` page is rendered only when the exact path `/` is matched.

- **Add Router component** to `index.js` file in the root of the project. It is necessary to wrap all the routable components under `<Router>` component. 

Replace the following lines of code in `index.js`:
```javascript
<React.StrictMode>
    <App />
</React.StrictMode>
```
with the following lines of code:
```javascript
import { BrowserRouter as Router } from "react-router-dom";

<Router>
  <App />
</Router>
```
 
Import `BrowserRouter` from `react-router-dom` and wrap your app component within the `<BrowserRouter>`. Here we have replaced the name `BrowserRouter` with `Router`, but it is optional to do so.

## Adding bootstrap

We will be using styles from `bootstrap` throughout this tutorial. To configure the bootstrap, install the `bootstrap` npm package. Run the following command in terminal: `yarn add bootstrap`. Add all the styles from bootstrap to the `index.js` file in the root directory.

```javascript
import "bootstrap/dist/css/bootstrap.min.css";

```

## Run the project

Run you project to check whether your routes and bootstrap is configured correctly. Go to the terminal and run: `yarn start`. The command would automatically navigate to `http://localhost:3000`. This would render the `Home` page as shown below:

<img src="https://i.imgur.com/winnIcT.png" />

Navigate to the `http://localhost:3000/add/` to view the `BookForm` page. The page should contain two input elements as shown below:

<img src="https://i.imgur.com/RZgHJhM.png" />

