import * as React from "react"
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Flights from './pages/Flights'
import Flight from './pages/Flight/[id]';

export const App = () => (
  <ChakraProvider  theme={theme}>
    <Router>
      <Route path = '/' />
      <Route path='/flights' component = {Flights} />
      <Route path='/flight/:flightId' component = {Flight} />
      <Route path = '/destinations' />
      <Route path = '/airports' />
      <Route path = '/airlines' />
    </Router>
  </ChakraProvider>
)
