import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from '../../../assets/logo-blue.png';

const Header = () => {
  const [show, toggleShow] = useState(false);
  const activeStyle = { color: "#007bff" };
  return (
    <div role="navigation">
      <div className="navbar navbar-expand-md navbar-light bg-light mb-4">
        <a className="navbar-brand" href="/">
          <img src={logo} width="50px" alt="Reactode" />
        </a>
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
