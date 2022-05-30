import React from 'react';
import { Link } from 'react-router-dom';

class LinkToCart extends React.Component {
  componentDidMount() {
    this.armazenarQuantidade();
  }

  armazenarQuantidade = () => {
    const renderQuantidade = localStorage.getItem('quantidade');
    if (renderQuantidade !== null) {
      return renderQuantidade;
    }
    return 0;
  }

  render() {
    return (
      <div className="carrinho_container">
        <Link
          data-testid="shopping-cart-button"
          to={
            { pathname: '/shoppingcart' }
          }
        >
          <img src="https://i.ibb.co/bBnZW5V/g1023.png" alt="carrinho" />
          <div className="contador">
            <p data-testid="shopping-cart-size">
              { this.armazenarQuantidade() }
            </p>
          </div>
        </Link>
      </div>
    );
  }
}

export default LinkToCart;
