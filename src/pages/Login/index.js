import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import './index.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      senha: ''
    }
    this.entrar = this.entrar.bind(this)
    this.login = this.login.bind(this)
  }
  componentDidMount() {
    if (firebase.getCurrent()) {
      this.props.history.replace('/dashboard')
    }
  }
  entrar(e) {
    e.preventDefault()
    this.login()
  }
  login = async () => {
    const { email, senha } = this.state
    try {
      await firebase.login(email, senha)
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            alert('Este usuario não existe')
          } else {
            alert('Codigo de erro: ' + error.code)
            return null
          }
        })
      this.props.history.replace('/dashboard')
    } catch (error) {
      alert(error.message)
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.entrar} id='login'>
          <label>Email:</label><br />
          <input type='email' placeholder='email@gmail.com' autoComplete='off' autoFocus value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} /><br />
          <label>Senha:</label><br />
          <input type='text' autoComplete='off' placeholder='Palavra passe' value={this.state.senha} onChange={(e) => this.setState({ senha: e.target.value })} /><br />
          <button type='submit'>Entrar</button>
          <Link to='/register'>Ainda não possue uma conta ?</Link>
        </form>
      </div>
    )
  }
}

export default withRouter(Login)
