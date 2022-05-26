import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCart extends React.Component {
state = {
  carrinho: [],
}

componentDidMount() {
  this.atualizarCarrinho();
}

atualizarCarrinho = () => {
  const { location: { state: { quantidade, state } } } = this.props;
  const { produto: { title, price } } = state;
  const novoProduto = { title, price, quantidade };
  this.setState((prevState) => ({
    carrinho: [...prevState.carrinho, novoProduto] }));
}

render() {
  const { carrinho } = this.state;
  return (
    <div>
      <h1>Meu carrinho de compras</h1>
      {!carrinho ? <h1 data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </h1>
        : (
          carrinho.map((produto, index) => (
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
