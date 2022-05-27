import React from 'react';

class FinalizePurchase extends React.Component {
  state = {
    nomeCompleto: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { nomeCompleto, email, cpf, telefone, cep, endereco } = this.state;
    return (
      <div>
        <label htmlFor="nomeCompleto">
          Nome Completo:
          <input
            data-testid="checkout-fullname"
            type="text"
            id="nomeCompleto"
            name="nomeCompleto"
            onChange={ this.handleChange }
            value={ nomeCompleto }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="checkout-email"
            type="email"
            id="email"
            name="email"
            onChange={ this.handleChange }
            value={ email }
          />
        </label>
        <label htmlFor="cpf">
          CPF:
          <input
            data-testid="checkout-cpf"
            type="text"
            id="cpf"
            name="cpf"
            onChange={ this.handleChange }
            value={ cpf }
          />
        </label>
        <label htmlFor="telefone">
          Telefone:
          <input
            data-testid="checkout-phone"
            type="tel"
            id="telefone"
            name="telefone"
            onChange={ this.handleChange }
            value={ telefone }
          />
        </label>
        <label htmlFor="cep">
          CEP:
          <input
            data-testid="checkout-cep"
            type="text"
            id="cep"
            name="cep"
            onChange={ this.handleChange }
            value={ cep }
          />
        </label>
        <label htmlFor="endereco">
          Endereco:
          <input
            data-testid="checkout-address"
            type="text"
            id="endereco"
            name="endereco"
            onChange={ this.handleChange }
            value={ endereco }
          />
        </label>
      </div>
    );
  }
}

export default FinalizePurchase;
