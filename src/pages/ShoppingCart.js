import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
state = {
  compra: [],
  produtos: [],
  quantidade: [],
}

componentDidMount() {
  this.atualizarCarrinho();
}

atualizarCarrinho = () => {
  const { location: { state: { carrinho } } } = this.props;
  this.setState({
    compra: carrinho }, this.filtraCarrinho);
}

diminuiQuantidade = (event) => {
  const { quantidade } = this.state;
  const index = event.target.value;
  if (quantidade[index].length > 1) {
    quantidade[index].pop();
    this.setState({
      quantidade,
    });
  }
}

aumentarQuantidade = (event) => {
  const { quantidade } = this.state;
  const index = event.target.value;
  const itemSelecionado = quantidade[index][0];
  quantidade[index].push(itemSelecionado);
  this.setState({
    quantidade,
  });
}

filtraCarrinho = () => {
  const { compra } = this.state;
  const produtos = [...new Set(compra)];
  const quantidade = produtos.map((produto) => compra
    .filter((item) => item.id === produto.id));
  this.setState({ produtos, quantidade });
}

render() {
  const { produtos, quantidade } = this.state;
  return (
    <div>
      <h1>Meu carrinho de compras</h1>

      {(produtos.length === 0) ? (
        <h1 data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </h1>
      )
        : (
          produtos.map((produto, index) => (
            <div key={ index }>
              <p data-testid="shopping-cart-product-name">{produto.title}</p>
              <p>{produto.price}</p>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                onClick={ this.diminuiQuantidade }
                value={ index }
              >
                -
              </button>
              <p data-testid="shopping-cart-product-quantity">
                {quantidade[index].length}
              </p>
              <button
                type="button"
                data-testid="product-increase-quantity"
                onClick={ this.aumentarQuantidade }
                value={ index }
              >
                +
              </button>
            </div>
          ))
        )}
      <Link to={ { pathname: '/purchase', state: { produtos, quantidade } } }>
        <button
          type="button"
          data-testid="checkout-products"
        >
          Finalizar Compra
        </button>
      </Link>
    </div>
  );
}
}

ShoppingCart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf }).isRequired,
  state: PropTypes.shape({
    carrinho: PropTypes.objectOf }).isRequired,
};

export default ShoppingCart;
