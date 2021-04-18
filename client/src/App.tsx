import * as React from "react"
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Flights from './pages/Flights'
import Flight from './pages/Flight/[id]';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

export const App = () => (
  <ChakraProvider  theme={theme}>
    <Router>
      <Route path = '/' component = {Home}/>
      <Route path = '/signin' component = {SignIn} />
      <Route path = '/signup' component = {SignUp} />
      <Route path='/flights' component = {Flights} />
      <Route path='/flight/:flightId' component = {Flight} />
      <Route path = '/destinations' />
      <Route path = '/airports' />
      <Route path = '/airlines' />
    </Router>
  </ChakraProvider>
)
