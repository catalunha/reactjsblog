import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import './index.css'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      email: '',
      senha: ''
    }
    this.cadastrar = this.cadastrar.bind(this)
    this.onRegister = this.onRegister.bind(this)

  }
  cadastrar(e) {
    e.preventDefault()
    this.onRegister()
  }
  onRegister = async () => {
    try {
      const { nome, email, senha } = this.state
      await firebase.register(nome, email, senha)
      this.props.history.replace('/dashboard')
    } catch (error) {
      alert(error.message)
    }
  }

  render() {
    return (
      <div>
        <h1 className='register-h1'>Novo Usuário</h1>
        <form onSubmit={this.cadastrar} id='register'>
          <labe>Nome:</labe><br />
          <input type='text' value={this.state.nome} autoFocus autoComplete='off' placeholder='João' onChange={(e) => this.setState({ nome: e.target.value })} /><br />
          <labe>Email:</labe><br />
          <input type='text' value={this.state.email} autoComplete='off' placeholder='email@gmail.com' onChange={(e) => this.setState({ email: e.target.value })} /><br />
          <labe>Senha:</labe><br />
          <input type='text' value={this.state.senha} autoComplete='off' placeholder='Senha de 8 caracteres com letras, simbolos e numeros' onChange={(e) => this.setState({ senha: e.target.value })} /><br />
          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    )
  }
}

export default withRouter(Register)
