import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class ProductsList extends React.Component {
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
      <div>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <Link to="/shoppingCart" data-testid="shopping-cart-button">Carrinho</Link>
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
      </div>
    );
  }
}

export default ProductsList;
