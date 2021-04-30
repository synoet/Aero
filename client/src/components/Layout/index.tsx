import React from 'react'
import { useScreenType } from '../../hooks/useScreenType'
import { LeftPanel, RightPanel, MainPanel } from './Panels'
import styled from 'styled-components'
import Header from '../Header'
import { Flex, Spinner } from '@chakra-ui/react'
import { AuthProvider } from '../../hooks/useAuth'

interface MainLayoutProps {
  leftPanel?: React.ReactNode
  rightPanel?: React.ReactNode
}

export const Layout: React.FC<MainLayoutProps> = ({ children, leftPanel = <div />, rightPanel }) => {
  const screenType = useScreenType()

  let content = null

  if (screenType === 'xl' || screenType === 'l' || screenType === 'm') {
    content = (
      <>
        {leftPanel && rightPanel && (
          <LeftPanel>
            {children}
            {leftPanel}
          </LeftPanel>
        )}
        {leftPanel && rightPanel && <RightPanel>{rightPanel}</RightPanel>}
        {leftPanel && !rightPanel && (
          <MainPanel>
            {children}
            {leftPanel}
          </MainPanel>
        )}
      </>
    )
  } else if (screenType === 's' || screenType === 'xs') {
    content = (
      <>
        <MainPanel>
          {children}
          {leftPanel}
        </MainPanel>
      </>
    )
  }

  return (
    <Flexing direction="column" align="center" padding="1.5rem">
      <Header></Header>
      <Flex w="100%" align="center" wrap="wrap" padding="1.5rem" width="100%" maxW="1200px" spacing="1rem">
        {content}
      </Flex>
    </Flexing>
  )
}

export default Layout

const Flexing = styled(Flex)`
  width: 100%;
  min-height: 100vh;
  height: 100%;
`
