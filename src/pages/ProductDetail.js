import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductDetail extends React.Component {
  state = {
    qtd: 1,
  }

  render() {
    const { qtd } = this.state;
    const { location: { state } } = this.props;
    const { produto: {
      title,
      price,
      thumbnail,
      attributes,
    } } = state;
    console.log(attributes);
    return (
      <div>
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
        <Link
          data-testid="product-detail-add-to-cart"
          to={
            { pathname: '/shoppingCart', state: { state, quantidade: qtd } }
          }
        >
          Comprar
        </Link>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf }).isRequired,
};

export default ProductDetail;
