import React from 'react';
import { Route, Switch } from "react-router-dom";
import { Header } from '../common/Header';
import { SideBar } from '../common/SideBar';
import { Home } from '../Home';
import { New } from '../New';
import { PageNotFound } from '../PageNotFound';
import './App.css';

const _App = () => {
  return (
    <div className="d-flex">
      <div className="bg-light border-right" id="sidebar-wrapper">
        <SideBar />
      </div>
      <div className="page-content-wrapper">
        <Header />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/new" component={New} />
            <Route path="/favorites" component={New} />
            <Route path="/archieves" component={New} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export const App = _App;
