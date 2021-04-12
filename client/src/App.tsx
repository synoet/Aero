import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Flights from './pages/Flights'

export const App = () => (
  <ChakraProvider  theme={theme}>
    <Flights></Flights>
  </ChakraProvider>
)
