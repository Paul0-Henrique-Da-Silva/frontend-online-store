const guardaNoLocalStor = (carrinho) => {
//   console.log(carrinho);
  //   const arrayCart = []
  const cart = JSON.stringify(carrinho);
  //   console.log(cart);
  localStorage.setItem('carrinho', cart);
};

export default guardaNoLocalStor;
