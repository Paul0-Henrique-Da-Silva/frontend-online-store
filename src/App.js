import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import ShoppingCart from './pages/ShoppingCart';
// import './App.css';

function App() {
  return (
    <main>
      <Router>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">Carrinho</Link>
        <Switch>
          <Route exact path="/" component={ ProductsList } />
          <Route path="/shoppingCart" component={ ShoppingCart } />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
