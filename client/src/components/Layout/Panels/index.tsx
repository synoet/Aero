import React from 'react'
import { Flex } from '@chakra-ui/react'
import styled from 'styled-components'

export const LeftPanel = ({ children }: { children: any }) => {
  return (
    <LeftFlex driection="column" d="inline-block" w="75%" padding="1rem">
      {children}
    </LeftFlex>
  )
}

export const RightPanel = ({ children }: { children: any }) => {
  return (
    <RightFlex driection="column" d="inline-block" w="25%" padding="1rem">
      {children}
    </RightFlex>
  )
}

export const MainPanel = ({ children }: { children: any }) => {
  return (
    <MainFlex direction="column" w="100%" padding="1rem">
      {children}
    </MainFlex>
  )
}

const LeftFlex = styled(Flex)``
const RightFlex = styled(Flex)``
const MainFlex = styled(Flex)``
