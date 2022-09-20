import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Provider from './context/Provider';
import Table from './pages/Table';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Table } />
      </Switch>
    </Provider>
  );
}

export default App;
