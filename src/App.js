import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import firebase from './firebase'
//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import NewPost from './pages/NewPost'
//components
import Header from './components/Header'
//css
import './global.css'

class App extends Component {
  state = {
    firebaseInicialized: false
  }
  componentDidMount() {

    firebase.isInitialized()
      .then((resultado) => {
        this.setState({ firebaseInicialized: resultado })
      })
  }
  render() {
    return this.state.firebaseInicialized !== false ?
      (
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/dashboard/newpost' component={NewPost} />
          </Switch>
        </BrowserRouter>
      ) :
      (
        <h1>Carregando...</h1>
      )

  }
}

export default App
