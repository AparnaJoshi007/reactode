import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Header } from '../common/Header';
import { Home } from '../Home';
import { Book } from '../Books/Book';
import { BookForm } from '../Books/BookForm';
import { PageNotFound } from '../PageNotFound';
import './App.css';

const _App = () => {
  return (
    <div className="page-content-wrapper">
      <Header />
      <div className="container-fluid">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={BookForm} />
          <Route path="/book/:slug" component={Book} />
          <Route path="/edit/:slug" component={BookForm} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}

export const App = _App;
