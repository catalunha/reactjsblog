import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import firebase from '../../firebase'
import './index.css'

class NewPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titulo: '',
      imagem: '',
      arquivo: null,
      arquivoPath: '',
      descricao: '',
      alert: '',
      progress: ''
    }
    this.cadastrar = this.cadastrar.bind(this)
    this.handleFile = this.handleFile.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }
  componentDidMount() {
    if (!firebase.getCurrent()) {
      this.props.history.replace('/')
      return null
    }
  }
  cadastrar = async (e) => {
    e.preventDefault()
    if (this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !== '') {
      let posts = firebase.database.ref('posts')
      let chave = posts.push().key
      await posts.child(chave).set({
        titulo: this.state.titulo,
        imagem: this.state.imagem,
        arquivoPath: this.state.arquivoPath,
        descricao: this.state.descricao,
        autor: localStorage.nome
      })
      this.props.history.push('/dashboard')
    } else {
      this.setState({ alert: 'Preencha todos os campos !' })
    }
  }
  handleFile = async (e) => {
    if (e.target.files[0]) {
      let arquivoLocal = e.target.files[0];
      if (arquivoLocal.type === 'image/png' || arquivoLocal.type === 'image/jpeg') {
        await this.setState({ arquivo: arquivoLocal })
        this.handleUpload()
      } else {
        alert('Envia uma imagem do tipo png/jpeg')
        this.setState({ arquivo: null })
      }
    }
  }
  handleUpload = async () => {
    const { arquivo } = this.state
    const currentUid = firebase.getCurrentUid()
    const uploadTasks = firebase.storage.ref(`posts/${currentUid}/${arquivo.name}`).put(arquivo);

    await uploadTasks.on('state_changed',
      (snapshot) => {
        //Progress
        console.log('Upload em progresso')
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        this.setState({progress:progress})
      }, (error) => {
        //Erro
        console.log('Error imagem: ' + error)

      }, (sucess) => {
        //Sucesso
        console.log('Sucesso no upload')
        firebase.storage
          .ref(`posts/${currentUid}`)
          .child(`${arquivo.name}`)
          .getDownloadURL().then((url) => {
            this.setState({ arquivoPath: url })
          })
      })

  }
  render() {
    return (
      <div>
        <header id='new'>
          <Link to='/dashboard'>Voltar</Link>
        </header>
        <form onSubmit={this.cadastrar} id='new-form'>
          <span>{this.state.alert}</span>
          <label>Titulo:</label><br />
          <input type='text' placeholder='Nome do post' value={this.state.titulo} autoFocus onChange={(e) => this.setState({ titulo: e.target.value })} /><br />
          <label>Url da imagem:</label><br />
          <input type='text' placeholder='Url da capa' value={this.state.imagem} autoFocus onChange={(e) => this.setState({ imagem: e.target.value })} /><br />
          <label>Arquivo:</label><br />
          <input type='file' onChange={this.handleFile} /><br />
          {/* <label>Preview:</label><br /> */}
          {this.state.arquivoPath !== ''
            ? <img src={this.state.arquivoPath} alt='' width='250' height='150' />
            : <progress value={this.state.progress} max='100' />
          }

          <label>Descrição:</label><br />
          <textarea type='text' placeholder='Alguma descrição' value={this.state.descricao} autoFocus onChange={(e) => this.setState({ descricao: e.target.value })} /><br />
          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    )
  }

}

export default withRouter(NewPost)
