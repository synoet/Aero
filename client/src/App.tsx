import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import Layout from './shared-components/Layout';

export const App = () => (
  <ChakraProvider theme={theme}>
  </ChakraProvider>
)
