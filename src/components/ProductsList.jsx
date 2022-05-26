import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
// import ProductDetail from '../pages/ProductDetail';

class ProductsList extends React.Component {
  state = {
    idCategoriaSelecionada: '',
    categorias: [],
    inputSearch: '',
    recebeProdutos: [],
  }

  componentDidMount() {
    this.buscaCategorias();
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

 render() {
   const { categorias, inputSearch, recebeProdutos } = this.state;
   return (
     <div>
       <h1 data-testid="home-initial-message">
         Digite algum termo de pesquisa ou escolha uma categoria.
       </h1>
       <Link to="/shoppingCart" data-testid="shopping-cart-button">Carrinho</Link>
       <div>
         <p>Categorias:</p>
         {
           categorias.map((categoria) => (
             <label data-testid="category" key={ categoria.id } htmlFor={ categoria.id }>
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
       <input
         type="text"
         data-testid="query-input"
         name="inputSearch"
         value={ inputSearch }
         onChange={ this.handleChange }
       />
       <button
         type="button"
         data-testid="query-button"
         onClick={ this.handleClick }
       >
         Buscar
       </button>

       { recebeProdutos.length === 0 ? <h1>Nenhum produto foi encontrado</h1>
         : (
           <div>
             {recebeProdutos.map((produto) => (
               <div key={ produto.id } data-testid="product">
                 <Link
                   data-testid="product-detail-link"
                   to={
                     { pathname: `/productdetail/${produto.id}`, state: { produto } }
                   }
                 >
                   <p>{produto.title}</p>
                   <img src={ produto.thumbnail } alt={ produto.title } />
                   <p>{produto.price}</p>
                 </Link>
               </div>))}
           </div>)}
     </div>
   );
 }
}

export default withRouter(ProductsList);
