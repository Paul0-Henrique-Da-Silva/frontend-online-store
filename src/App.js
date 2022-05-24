import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductsList from './components/ProductsList';
// import './App.css';

function App() {
  return (
    <main>
      <p>Iahuuuu!</p>
      <Router>
        <Switch>
          <Route exact path="/" component={ ProductsList } />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
