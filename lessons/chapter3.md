# Class components v/s Functional components

React takes component based approach for building an application. The component is a smallest isolated piece of code, that handle a particular functionality. Three things to understand about components:

- A component can be a Class component or a Functional component.
- A component can render other component as its child.
- A component can pass data to its child. The flow of data is always unidirectional.

Before React 16.8, the major difference between a Class and a Functional component was the availability of life cycle methods. Class components were considered to be `Stateful` components with the ability to maintain data, perform interactions on the data, and the Functional components did not have the ability to create state. They were `stateless` components that could only render the data passed to them. However, with the addtion of `hooks` in react, the whole application can be written using just functions. This would also keep the component clean, readable, and reduces the hassle of having to deal with `this` keyword. Along with this, react hooks also aim at reducing the compoenent hell problem. Functional components does have one small caveat. `componentDidError` and `getSnapshotBeforeUpdate` methods cannot be executed through a functional component. 

## Initial App Structure

The initial app contains 2 mail folders within `/client` folder. 

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

The `ReactDOM.render()` will render html generated through the compoenents under the <div> with id `root`.

