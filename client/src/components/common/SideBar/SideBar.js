import React from 'react';
import { NavLink } from "react-router-dom";
import logo from '../../../assets/logo-blue.png';

const SideBar = () => {
  const activeStyle = { color: "#007bff" };

  return (
    <>
      <a className="navbar-brand" href="/">
        <img src={logo} width="50px" alt="Reactode" />
      </a>
      <div className="list-group list-group-flush">
        <NavLink to="/" className="list-group-item list-group-item-action bg-light" activeStyle={activeStyle} exact>My Recipes</NavLink>
        <NavLink to="/favorites" className="list-group-item list-group-item-action bg-light" activeStyle={activeStyle}>Favorites</NavLink>
        <NavLink to="/archieves" className="list-group-item list-group-item-action bg-light" activeStyle={activeStyle}>Archieves</NavLink>
      </div>
    </>
  );
}

export { SideBar };
