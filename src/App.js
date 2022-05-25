import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import ShoppingCart from './pages/ShoppingCart';
import { getCategories } from './services/api';
// import './App.css';

class App extends React.Component {
state = {
  categorias: [],
}

async componentDidMount() {
  const categorias = await getCategories();
  this.setState({
    categorias,
  });
}

render() {
  const { categorias } = this.state;
  return (
    <main>
      <Router>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">Carrinho</Link>
        <Switch>
          <Route exact path="/" component={ ProductsList } />
          <Route path="/shoppingCart" component={ ShoppingCart } />
        </Switch>
      </Router>
      <div>
        <p>Categorias:</p>
        {
          categorias.map((categoria) => (
            <label data-testid="category" key={ categoria.id } htmlFor={ categoria.id }>
              { categoria.name }
              <input type="radio" name={ categoria.name } id={ categoria.id } />
            </label>
          ))
        }

      </div>
    </main>
  );
}
}

export default App;
