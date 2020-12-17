# Class components v/s Functional components

React takes component based approach for building an application. The component is a smallest isolated piece of code, that handle a particular functionality. Three things to understand about components:

- A component can be a Class component or a Functional component.
- A component can render other component as its child.
- A component can pass data to its child. The flow of data is always unidirectional.

Before React 16.8, the major difference between a Class and a Functional component was the availability of life cycle methods. Class components were considered to be `Stateful` components with the ability to maintain data, perform interactions on the data, and the Functional components did not have the ability to create state. They were `stateless` components that could only render the data passed to them. However, with the addtion of `hooks` in react, the whole application can be written using just functions. This would also keep the component clean, readable, and reduces the hassle of having to deal with `this` keyword. Along with this, react hooks also aim at reducing the compoenent hell problem. Functional components does have one small caveat. `componentDidError` and `getSnapshotBeforeUpdate` methods cannot be executed through a functional component. 

## Initial App Structure

The initial app contains 2 main folders within `/client` folder. 

<img src="https://i.imgur.com/l7WkthU.png" />

- `/public`: The `public` folder contains the static files and `index.html` page template.
- `/src`: The `src` folder contains all the project related files. `index.js` will be the entry point.

```javascript
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

The `ReactDOM.render()` will render html generated through the compoenents under the `<div>` with id `root`.

Please keep the `public` folder as it is. The `src` folder have the following changes. Note that these changes are not mandatory for the app to work, however, it provides a neat segregation of our code:

1. `index.js` and `index.css` files will remain in the root of the directory.
2. Create a new folder `components` and create the folder `App/` under it. Move the files of `App.js` and `App.css` under the `App/` folder. Replace the following styles under `App.css`, this contains all the styles required by the project.

```css
.page-content-wrapper {
  min-width: 0;
  width: 100%;
}

.show {
  display: block !important;
}

.modal {
  max-width: 500px;
  margin: 0 auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: auto !important;
  height: auto !important;
}

.cooking-time-container {
  display: flex;
}

.input-genre {
  display: inline;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 4px;
  margin-right: 2px;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.genre-close {
  font-size: 20px;
  margin-left: 4px;
  top: 2px;
  position: relative;
  cursor: pointer;
}

.genre-creator {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.genre-holder {
  overflow: scroll;
}

.form-group {
  width: 100%;
}

.no-outline {
  border: none !important;
  overflow: auto;
  outline: none !important;
  box-shadow: none !important;
  resize: none;
}

.book-name {
  line-height: 38px;
  flex: 1;
  padding-left: 12px;
}
```
3. Change the `index.js` file in the root folder to import `App` from the new location.
```javascript
import App from './components/App/App';
```
4. Create a new folder `tests`. Move the file `App.test.js` under the folder.


Now your project should contain: 
- `components`: All the UI components will be written here.
- `tests`: All the unit tests will be written here.

Add routes to the project, Go to => [Chapter4](/lessons/chapter4.md)
