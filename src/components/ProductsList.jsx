import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import LinkToCart from './LinkToCart';
import '../Moai.css';
// import ProductDetail from '../pages/ProductDetail';

class ProductsList extends React.Component {
  state = {
    idCategoriaSelecionada: '',
    categorias: [],
    inputSearch: '',
    recebeProdutos: [],
    carrinho: [],
  }

  componentDidMount() {
    this.buscaCategorias();
    this.verificarCarrinho();
    this.verificarQuantidade();
  }

 handleChange = ({ target }) => {
   const { name, value } = target;
   if (name === 'idCategoriaSelecionada') {
     this.setState({ [name]: value }, this.selecionarPorCategoria);
   }
   this.setState({ [name]: value });
 }

 buscaCategorias = async () => {
   const categorias = await getCategories();
   this.setState({
     categorias,
   });
 };

 verificarCarrinho = () => {
   const loadCarrinho = localStorage.getItem('carrinho');
   if (loadCarrinho !== null) {
     const produtosNoCarrinho = JSON.parse(loadCarrinho);
     this.setState({
       carrinho: produtosNoCarrinho,
     });
   }
 }

verificarQuantidade = () => {
  const carregaQuantidade = localStorage.getItem('quantidade');
  if (carregaQuantidade === null) {
    localStorage.setItem('quantidade', 0);
  }
}

 selecionarPorCategoria = async () => {
   const { idCategoriaSelecionada } = this.state;
   const resultApi = await getProductsFromCategoryAndQuery(idCategoriaSelecionada, null);
   this.setState({ recebeProdutos: resultApi.results });
 }

 handleClick = async () => {
   const { inputSearch } = this.state;
   const resultApi = await getProductsFromCategoryAndQuery(null, inputSearch);
   this.setState({ recebeProdutos: resultApi.results });
 }

 colocarNoCarrinho = (event) => {
   const { recebeProdutos, carrinho } = this.state;
   const productId = event.target.value;
   const produtoSelecionado = recebeProdutos
     .filter((produto) => productId === produto.id);
   carrinho.push(produtoSelecionado[0]);
   this.setState({
     carrinho,
   });
   let conteudoCarrinho = localStorage.getItem('carrinho');
   if (conteudoCarrinho === null) {
     const carrinhoString = JSON.stringify(produtoSelecionado);
     localStorage.setItem('carrinho', carrinhoString);
   }
   if (conteudoCarrinho !== null) {
     conteudoCarrinho = JSON.parse(conteudoCarrinho);
     conteudoCarrinho.push(produtoSelecionado[0]);
     const carrinhoString = JSON.stringify(conteudoCarrinho);
     localStorage.setItem('carrinho', carrinhoString);
   }
   let contador = localStorage.getItem('quantidade');
   contador = parseInt(contador, 10) + 1;
   localStorage.setItem('quantidade', contador);
 }

 render() {
   const { categorias, inputSearch, recebeProdutos } = this.state;
   return (
     <div>
       <header className="main_header">
         <div className="logo_container">
           <img src="https://i.ibb.co/nmcxSYS/moai-shopping-logo.png" alt="logotipo" className="logo_mainbar" />
           <img src="https://i.ibb.co/hfxZ9tc/text854.png" alt="moai shopping" className="tipo_mainbar" />
         </div>
         <div className="barra_busca_container">
           <p data-testid="home-initial-message">
             Digite algum termo de pesquisa ou escolha uma categoria.
           </p>
           <input
             type="text"
             className="search_bar"
             data-testid="query-input"
             name="inputSearch"
             value={ inputSearch }
             onChange={ this.handleChange }
           />
           <button
             type="button"
             className="search_button"
             data-testid="query-button"
             onClick={ this.handleClick }
           >
             Buscar
           </button>
         </div>
         <LinkToCart />
       </header>
       <div className="corpo_principal">
         <div className="categorias">
           <p>Categorias:</p>
           {
             categorias.map((categoria) => (
               <label
                 data-testid="category"
                 key={ categoria.id }
                 htmlFor={ categoria.id }
               >
                 { categoria.name }
                 <input
                   type="radio"
                   name="idCategoriaSelecionada"
                   id={ categoria.id }
                   value={ categoria.id }
                   onChange={ this.handleChange }
                 />
               </label>
             ))
           }
         </div>

         { recebeProdutos.length === 0 ? <h1>Nenhum produto foi encontrado</h1>
           : (
             <div className="card_container">
               {recebeProdutos.map((produto) => (
                 <div key={ produto.id } className="card_produto" data-testid="product">
                   <Link
                     data-testid="product-detail-link"
                     to={
                       { pathname: `/productdetail/${produto.id}`, state: { produto } }
                     }
                   >
                     <p>{produto.title}</p>
                     <img src={ produto.thumbnail } alt={ produto.title } />
                     <span>
                       { produto.shipping.free_shipping
                     && <p data-testid="free-shipping">Frete grátis</p>}
                     </span>
                     <p>{produto.price}</p>
                   </Link>
                   <button
                     data-testid="product-add-to-cart"
                     type="button"
                     onClick={ this.colocarNoCarrinho }
                     value={ produto.id }
                   >
                     Adicionar ao Carrinho
                   </button>
                 </div>))}
             </div>)}
       </div>
     </div>
   );
 }
}

export default withRouter(ProductsList);
