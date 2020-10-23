import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "../redux/configureStore";
import { App } from '../components/App';

const store = configureStore();

test('render app', () => {
  const { getByText } = render(
    <ReduxProvider store={store}>
      <Router>
        <App />
      </Router>
    </ReduxProvider>);
  getByText("Loading...");
})