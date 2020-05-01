import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import firebase from './firebase'

//pages
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
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
            <Route exact path='/dashboard' component={Dashboard} />
          </Switch>
        </BrowserRouter>
      ) :
      (
        <h1>Carregando...</h1>
      )

  }
}

export default App
