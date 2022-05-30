import React from 'react';
import PropTypes from 'prop-types';
import LinkToCart from '../components/LinkToCart';

class ProductDetail extends React.Component {
  state = {
    comentariosArquivados: [],
    getRender: '',
  }

  componentDidMount() {
    const { location: { state: { produto: { id } } } } = this.props;
    const comentariosArquivados = localStorage.getItem(id);
    if (comentariosArquivados) {
      this.setState({
        comentariosArquivados: JSON.parse(comentariosArquivados),
      });
    }
  }

  colocarNoCarrinho = () => {
    const { location: { state } } = this.props;
    const { produto } = state;
    const { getRender } = this.state;
    let conteudoCarrinho = localStorage.getItem('carrinho');
    if (conteudoCarrinho === null) {
      const arrProduto = [produto];
      const carrinhoString = JSON.stringify(arrProduto);
      localStorage.setItem('carrinho', carrinhoString);
      this.setState({
        getRender: 'walk on...',
      });
    }
    if (conteudoCarrinho !== null) {
      conteudoCarrinho = JSON.parse(conteudoCarrinho);
      conteudoCarrinho.push(produto);
      const carrinhoString = JSON.stringify(conteudoCarrinho);
      localStorage.setItem('carrinho', carrinhoString);
      console.log(getRender);
      this.setState({
        getRender: 'walk on mon no plus...',
      });
    }
    let contador = localStorage.getItem('quantidade');
    contador = parseInt(contador, 10) + 1;
    localStorage.setItem('quantidade', contador);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { location: { state: { produto: { id } } } } = this.props;
    const { avaliacao, comentario, email } = this.state;
    const comentariosArquivados = localStorage.getItem(id);
    const avaliado = JSON.stringify([{ email, avaliacao, comentario }]);
    let armazenarAvaliados = [];
    if (!comentariosArquivados) {
      localStorage.setItem(id, avaliado);
    } else {
      const avalRecuperado = JSON.parse(comentariosArquivados);
      armazenarAvaliados = [{ email, avaliacao, comentario }, ...avalRecuperado];
      localStorage.setItem(id, JSON.stringify(armazenarAvaliados));
    }
    this.setState({
      email: '',
      comentario: '',
      comentariosArquivados: comentariosArquivados
        ? armazenarAvaliados : [{ email, avaliacao, comentario }] });
  }

  render() {
    const { location: { state } } = this.props;
    const { produto: {
      title,
      price,
      thumbnail,
      attributes,
      shipping,
    } } = state;
    const { comentario, email, comentariosArquivados } = this.state;
    const produto = [state.produto];
    const aval1 = 1;
    const aval2 = 2;
    const aval3 = 3;
    const aval4 = 4;
    const aval5 = 5;
    return (
      <div>
        <LinkToCart />
        <h1>Detalhes do produto</h1>
        <h3 data-testid="product-detail-name">{title}</h3>
        <h2>{price}</h2>
        <img src={ thumbnail } alt={ title } />
        <span>
          { shipping.free_shipping && <p>Frete grátis</p> }
        </span>
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
          onClick={ this.colocarNoCarrinho }
          value={ produto.id }
        >
          Adicionar ao Carrinho
        </button>

        <div className="avaliacao">
          <input
            type="email"
            data-testid="product-detail-email"
            placeholder="Email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />
          <input
            type="radio"
            data-testid={ `${aval1}-rating` }
            name="avaliacao"
            value="1"
            onChange={ this.handleChange }
          />
          <input
            type="radio"
            data-testid={ `${aval2}-rating` }
            name="avaliacao"
            value="2"
            onChange={ this.handleChange }
          />
          <input
            type="radio"
            data-testid={ `${aval3}-rating` }
            name="avaliacao"
            value="3"
            onChange={ this.handleChange }
          />
          <input
            type="radio"
            data-testid={ `${aval4}-rating` }
            name="avaliacao"
            value="4"
            onChange={ this.handleChange }
          />
          <input
            type="radio"
            data-testid={ `${aval5}-rating` }
            name="avaliacao"
            value="5"
            onChange={ this.handleChange }
          />
          <textarea
            data-testid="product-detail-evaluation"
            value={ comentario }
            onChange={ this.handleChange }
            name="comentario"
          />
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ this.handleClick }
          >
            Avaliar
          </button>

          { comentariosArquivados
          && (
            <div>
              {comentariosArquivados.map((aval, index) => (
                <div key={ index }>
                  <p>{aval.email}</p>
                  <p>{aval.avaliacao}</p>
                  <p>{aval.comentario}</p>
                </div>))}
            </div>)}
        </div>

      </div>
    );
  }
}

ProductDetail.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.objectOf }).isRequired,
};

export default ProductDetail;
