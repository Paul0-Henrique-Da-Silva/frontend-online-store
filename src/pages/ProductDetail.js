import React from 'react';
// import PropTypes from 'prop-types';

class ProductDetail extends React.Component {
  render() {
    const { produto: {
      title,
      price,
      thumbnail,
      attributes,
     } } = this.props.location.state;
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
      </div>
    );
  }
}

export default ProductDetail;
