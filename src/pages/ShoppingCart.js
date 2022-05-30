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
  let carrinho = localStorage.getItem('carrinho');
  if (carrinho !== null) {
    carrinho = JSON.parse(carrinho);
    this.setState({
      compra: carrinho }, this.filtraCarrinho);
  }
}

diminuiQuantidade = (event) => {
  const { quantidade } = this.state;
  const index = event.target.value;
  const itemId = quantidade[index][0].id;
  if (quantidade[index].length > 1) {
    quantidade[index].pop();
    this.setState({
      quantidade,
    });
    let conteudoCarrinho = localStorage.getItem('carrinho');
    conteudoCarrinho = JSON.parse(conteudoCarrinho);
    const popIndex = conteudoCarrinho.findIndex((itemCarr) => itemCarr.id === itemId);
    console.log(conteudoCarrinho);
    conteudoCarrinho.splice(popIndex, 1);
    console.log(conteudoCarrinho);
    const carrinhoString = JSON.stringify(conteudoCarrinho);
    localStorage.setItem('carrinho', carrinhoString);
    let contador = localStorage.getItem('quantidade');
    contador = parseInt(contador, 10) - 1;
    localStorage.setItem('quantidade', contador);
  }
}

aumentarQuantidade = (event, qtdDisponivel) => {
  const { quantidade } = this.state;
  console.log(quantidade.length);
  const index = event.target.value;
  const itemSelecionado = quantidade[index][0];
  if (qtdDisponivel > 0) {
    quantidade[index].push(itemSelecionado);
    this.setState({
      quantidade,
    }, console.log(quantidade.length));
    let conteudoCarrinho = localStorage.getItem('carrinho');
    conteudoCarrinho = JSON.parse(conteudoCarrinho);
    conteudoCarrinho.push(itemSelecionado);
    const carrinhoString = JSON.stringify(conteudoCarrinho);
    localStorage.setItem('carrinho', carrinhoString);
    let contador = localStorage.getItem('quantidade');
    contador = parseInt(contador, 10) + 1;
    localStorage.setItem('quantidade', contador);
  }
}

filtraCompra = (compra) => {
  const arrRetorno = [];
  compra.forEach((item) => {
    if (arrRetorno.length === 0) {
      arrRetorno.push(item);
    }
    const existInArray = arrRetorno.some((elem) => elem.id === item.id);
    if (existInArray === false) {
      arrRetorno.push(item);
    }
  });
  return arrRetorno;
}

filtraCarrinho = () => {
  const { compra } = this.state;
  const produtos = this.filtraCompra(compra);
  console.log(produtos);
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
                onClick={ (event) => this
                  .aumentarQuantidade(event, produto
                    .available_quantity - quantidade[index].length) }
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
