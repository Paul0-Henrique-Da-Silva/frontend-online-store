import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetail extends React.Component {
  state = {
    // idCategoriaSelecionada: '',
    // categorias: [],
    // inputSearch: '',
    // recebeProdutos: [],
    carrinho: [],
  }

  colocarNoCarrinho = (produto) => {
    const { carrinho } = this.state;
    this.setState({ carrinho: [...carrinho, produto] });
  }

  render() {
    const { location: { state } } = this.props;
    const { produto: {
      title,
      price,
      thumbnail,
      attributes,
    } } = state;
    const { carrinho } = this.state;
    const produto = [state.produto];
    console.log('state dentro do render: ', produto);

    return (
      <div>
        <Link
          data-testid="shopping-cart-button"
          to={ { pathname: '/shoppingcart', state: { carrinho } } }
        >
          Carrinho
        </Link>

        <h1>Detalhes do produto</h1>
        <h3 data-testid="product-detail-name">{title}</h3>
        <h2>{price}</h2>
        <img src={ thumbnail } alt={ title } />
        <div>
          <ul>
            { attributes.map((atributo, index) => (
              <li key={ index }>{ `${atributo.name}: ${atributo.value_name}` }</li>
            ))}
          </ul>
        </div>

        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => this.colocarNoCarrinho(...produto) }
          value={ produto.id }
        >
          Adicionar ao Carrinho
        </button>

      </div>
    );
  }
}

ProductDetail.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf }).isRequired,
};

export default ProductDetail;
