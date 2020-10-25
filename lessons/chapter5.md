## Navigational component

In the previous chapter, we have added the routes for `Home` page and the `BookForm` page. We will now add the Navigation bar so that the webpage has clickable links to navigate between various pages. Create a new folder `/common` under the `/components` folder. This folder will contain all the common components that are required by the application.

- **Create Header** component by creating a new folder `/Header` under `/common` folder. Add `index.js` file under this folder. Add the following lines of code.

```javascript
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
  const [show, toggleShow] = useState(false);
  const activeStyle = { color: "#007bff" };
  return (
    <div role="navigation">
      <div className="navbar navbar-expand-md navbar-light bg-light mb-4">
        <button onClick={() => toggleShow(!show)} className={`navbar-toggler ${show ? '' : 'collapsed'}`} type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded={show ? false : true} aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${show ? 'show' : ''}`} id="navbarTogglerDemo01">
          <ul className="navbar-nav ml-2 mt-2 mt-md-0 mr-sm-0 mr-md-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" activeStyle={activeStyle} exact>
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add" activeStyle={activeStyle}>
                Add Book
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { Header };
```

Most of the component contains the raw HTML and the styles required for the navigation. Note the usage of `NavLink` component from `react-router-dom`. This component is used to provide internal navigation between various pages in the application, without reloading the page. The `NavLink` compoennt takes in two props, `to` and `activeStyle`. The `to` prop refers to the link to which the application must be navigated to, and the `activeStyle` prop is used to add the styles to the element if it matches the route. The `button` element present in the navigation is to handle the responsive behaviour of the website so that it can be used in the mobile as well. `const [show, toggleShow] = useState(false);` will handle the opening and closing of the navigation elements in the mobile. `toggleShow()` function will open and close the navigation menu items in the responsive mode.

## Adding common components

Apart from `Header`, the project uses few of the common components that can be added under the `/common` folder. We need 5 components to be added under this. Note that all these components only act as the functional stateless components, which renders plain HTML and the data given to it by the parents. These components are the smallest pieces of resuable UI elements.

1. **InputText**: Create a new folder `/InputText` under the `/common` folder and create a new file `index.js` under it. This component will render an `input` text element and a `label` for the given element. Copy paste the following lines of code in the `index.js` file.

```javascript
import React from 'react';

const InputText = ({ 
  id, 
  name, 
  value, 
  placeHolder, 
  title, 
  error, 
  handleChange }) => (
  <div className="form-group">
    {title && <label htmlFor={name} className="col col-form-label">{title}</label>}
    <div className="col-sm-12">
      <input type="text" className={`form-control ${error ? 'is-invalid': ''}`} id={id} name={name} value={value} onChange={handleChange} placeholder={placeHolder} />
    </div>
    <div className="col-sm-12">
      {error &&
        <small id="passwordHelp" className="text-danger">{error}</small>}
    </div>
  </div>
);

export { InputText };
```

2. **TextArea**: Create a new folder `/TextArea` under the `/common` folder, and add `index.js` file under it. Copy paste the following lines of code:

```javascript
import React from 'react';

const TextArea = React.forwardRef(({ 
  id, 
  placeHolder }, ref) => (
  <div className="form-group">
    <div className="col-sm-12">
    <textarea className="form-control no-outline" rows="12" ref={ref} id={id} placeholder={placeHolder}></textarea>
    </div>
  </div>
));

export { TextArea };
```

The `TextArea` component uses the `React.forwardRef`. The functional components need to be wrapped under the `React.forwardRef` to be able to recieve the refs sent to them by the parent component. More details on the usage of refs will be provided in [Chapter](/lessons/chapter).

3. **InputSelect**: Create a new folder `/InputSelect` under the `/common` folder. Add `index.js` file under it. The `InputSelect` component recieves the list of options in the form of an array nad renders these options to be selected by the user. Upon selection, it calls the `handleChange` function that can be used to controll the selected element. Add the following lines of code to the component. The

```javascript
import React from "react";

const InputSelect = ({
  id,
  name,
  title,
  value,
  defaultOption,
  error,
  handleChange,
  options
}) => {
  return (
    <div className="form-group">
      <label className="col col-form-label" htmlFor={name}>{title}</label>
      <div className="field col-sm-12">
        <select
          id={id}
          name={name}
          className="form-control"
          onChange={handleChange}
          value={value || ''}
        >
          <option value="">{defaultOption}</option>
          {options.map(option => {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
        {error &&
          <small id="passwordHelp" className="text-danger">{error}</small>}
      </div>
    </div>
  );
};

export { InputSelect };
```

4. **Spinner**: Create a new folder `/Spinner` under the `/common` folder and add the following lines of code in the `index.js`.

```javascript
import React from "react";

const Spinner = () => (
  <div className="d-flex justify-content-center">
    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export { Spinner };
```

5. **Modal**: Create a new folder `/Modal` under the `/common` folder and add `index.js` file. Add the following lines of code to this file.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ 
  isOpen, 
  toggle, 
  children }) => {
  return isOpen ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-backdrop fade show" onClick={() => toggle(!isOpen)}></div>
      <div className="modal fade show" id="form-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.body
  ) : null
};


const ModalBody = ({ children }) => {
	return (
		<div className="modal-body">
      {children}
    </div>
	);
}

const ModalFooter = ({ children }) => {
	return (
    <div className="modal-footer">
      {children}
    </div>
  );
}

const ModalTitle = ({ children, handleClick }) => {
	return (
    <div className="modal-header">
      <h5 className="modal-title">{children}</h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClick}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}


export { Modal, ModalTitle, ModalBody, ModalFooter };
```

The `Modal` component exports 4 components to display and close the Modal. 
- `ModalBody` is a simple header component, that renders any child sent to it. 
- `ModalFooter` also render the footer component sent to it as child. 
- `ModalTitle` component takes two props, `children` and `handleClick`. The `handleClick` method will manage the opening and closing of the modal.
- `Modal` component is the parent component which would hold various parts of the Modal. The Modal is rendered outside the normal DOM, under the HTML body. This is not mandatory, however it is an useful option given be `createPortal`, where in the DOM is rendered outside the immediate parent element. `ReactDOM.createPortal` renders the component under a different DOM tree within the `body`. This is helpful when the parent element should be hidden with a `z-index` and the child element must be displayed outside the parent element such as tooltips, modals, etc. Instead of using `ReactDOM.render` we are using `ReactDOM.createPortal` to directly render within the body. Note that such a portal can be created anywhere within the body. A `div` can be given an `id` and it can be used to render the portal.

### Event bubbling through the createPortal

Even though `createPortal` renders an element outside the normal DOM tree, the events triggered by them follow through the natural progression of `event bubble` sequence. Any events generated within the portal that are not caught will eventually bubble through the DOM tree, and can be caught by the default DOM where all the other elements are mounted. This is a useful scenario, when handling the opening and closing of a modal is to be handled by the parent component outside which the Modal is rendered.

Add Redux to the project, Go to => [Chapter6](/lessons/chapter6.md)