import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import { AuthProvider } from './context/auth'
import AuthRoute from './util/AuthRoute'

import Home from './views/Home'
import Login from './views/Login'
import Register from './views/Register'
import Navbar from './components/Navbar/Navbar'
import PostDescription from './views/PostDescription'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Container>
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route path='/post/:id' component={PostDescription} />
        </Container>
      </Router>
    </AuthProvider>
  )
}

export default App;
