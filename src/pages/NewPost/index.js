import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './index.css'

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titulo: '',
      imagem: '',
      descricao: '',
    }
    this.cadastrar = this.cadastrar.bind(this)
  }
  cadastrar(e) {
    e.preventDefault()
  }
  render() {
    return (
      <div>
        <header id='new'>
          <Link to='/dashboard'>Voltar</Link>
        </header>
        <form onSubmit={this.cadastrar} id='new-form'>
          <label>Titulo:</label><br />
          <input type='text' placeholder='Nome do post' value={this.state.titulo} autoFocus onChange={(e) => this.setState({ titulo: e.target.value })} /><br />
          <label>Url da imagem:</label><br />
          <input type='text' placeholder='Url da capa' value={this.state.imagem} autoFocus onChange={(e) => this.setState({ imagem: e.target.value })} /><br />
          <label>Url da imagem:</label><br />
          <textarea type='text' placeholder='Alguma descrição' value={this.state.descricao} autoFocus onChange={(e) => this.setState({ descricao: e.target.value })} /><br />
          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    )
  }

}

export default withRouter(NewPost)
