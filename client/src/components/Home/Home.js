import React from 'react';
import { Link } from "react-router-dom";

const Home = () => (
  <div className="jumbotron">
    <h1>Dashboard</h1>
    <p>Find your code, link and notes here.</p>
    <Link to="about" className="btn btn-primary btn-lg">
      Learn more
    </Link>
  </div>
);

export { Home };
