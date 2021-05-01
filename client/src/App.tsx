import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ChakraProvider, theme } from '@chakra-ui/react'
import Flights from './pages/Flights'
import Flight from './pages/Flight/[id]'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import { AuthProvider } from './hooks/useAuth'
import Dashboard from './pages/Dashboard'
import Transaction from './pages/Flight/transaction';

export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Router>
        <Route path="/Home" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/flights" component={Flights} />
        <Route path="/flight/:flightId" component={Flight} />
        <Route path="/destinations" component={Destinations} />
        <Route path="/airlines" />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/transaction" component={Transaction} />
      </Router>
    </AuthProvider>
  </ChakraProvider>
)
