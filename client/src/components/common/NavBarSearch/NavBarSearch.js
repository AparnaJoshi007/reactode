import React from 'react';
import { FaSearch } from 'react-icons/fa';

const NavBarSearch = () => {
  return (
    <form className="mt-2 mt-md-0 w-75">
        <div className="input-group input-group-lg">
         <input className="form-control mr-2" type="text" placeholder="Search" aria-label="Search" />
         <button className="btn btn-outline-primary" type="submit"><FaSearch /></button>
        </div>
    </form>
  );
}

export { NavBarSearch };
