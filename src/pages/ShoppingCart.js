import React from 'react';
import PropTypes from 'prop-types';
import guardaNoLocalStor from '../services/atualizaLocalStor';

class ShoppingCart extends React.Component {
state = {
  compra: [],
}

componentDidMount() {
  this.atualizarCarrinho();
}

componentDidUpdate() {
  const { compra } = this.state;
  guardaNoLocalStor(compra);
}

atualizarCarrinho = () => {
  const { location: { state: { carrinho } } } = this.props;
  this.setState((prevState) => ({
    compra: [...prevState.compra, carrinho] }));
}

render() {
  const { compra } = this.state;
  return (
    <div>
      <h1>Meu carrinho de compras</h1>

      {!compra ? (
        <h1 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h1>
      )
        : (

          compra.map((produto, index) => (
            <div key={ index }>
              <p data-testid="shopping-cart-product-name">{produto.title}</p>
              <p>{produto.price}</p>
              <p data-testid="shopping-cart-product-quantity">{produto.quantidade}</p>
            </div>
          ))

        )}
    </div>
  );
}
}

ShoppingCart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf }).isRequired,
  state: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};

export default ShoppingCart;
