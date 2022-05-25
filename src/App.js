import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import ShoppingCart from './pages/ShoppingCart';

// import './App.css';

class App extends React.Component {
  render() {
    return (
      <main>
        <Router>
          <Switch>
            <Route exact path="/" component={ ProductsList } />
            <Route path="/shoppingCart" component={ ShoppingCart } />
          </Switch>
        </Router>

      </main>
    );
  }
}

export default App;
