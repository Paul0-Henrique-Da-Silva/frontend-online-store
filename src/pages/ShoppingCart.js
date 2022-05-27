import React from 'react';
import PropTypes from 'prop-types';
import guardaNoLocalStor from '../services/atualizaLocalStor';

class ShoppingCart extends React.Component {
state = {
  compra: [],
  produtos: [],
  quantidade: [],
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
  this.setState({
    compra: carrinho }, this.filtraCarrinho);
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
              <p data-testid="shopping-cart-product-quantity">
                {quantidade[index].length}
              </p>
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
