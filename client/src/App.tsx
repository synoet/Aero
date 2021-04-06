import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import Flights from './Pages/Flights'

export const App = () => (
  <ChakraProvider theme={theme}>

    <Flights/>
  </ChakraProvider>
)
