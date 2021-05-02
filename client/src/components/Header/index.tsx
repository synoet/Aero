import React, { useState } from 'react'
import { Box, Heading, Flex, Button, chakra, Center, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import logotype from '../../images/logotype.svg'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import NavItem from './NavItem'

import { ChevronDownIcon } from '@chakra-ui/icons'

import { FiCornerDownLeft, FiUser, FiSettings } from 'react-icons/fi'

const Header = (props: any) => {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)
  const auth = useAuth()

  const history = useHistory()

  const location = useLocation()

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" width="100%" maxW="1200px">
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          <chakra.img h="50px" src={logotype} />
        </Heading>
      </Flex>
      <Center>
        <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
          <svg fill="black" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>
        <Flex></Flex>

        <Box
          display={{ sm: show ? 'block' : 'none', md: 'flex' }}
          width={{ sm: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
        >
          <Flex>
            <NavItem to="/home" active={location.pathname === '/home' ? true : false}>
              {' '}
              Home{' '}
            </NavItem>
            <NavItem to="/flights" active={location.pathname === '/flights' ? true : false}>
              {' '}
              Flights{' '}
            </NavItem>
            <NavItem to="/destinations" active={location.pathname === '/destinations' ? true : false}>
              {' '}
              Destinations{' '}
            </NavItem>
            {auth.user && (
              <NavItem to="/dashboard" active={location.pathname === '/dashboard' ? true : false}>
                {' '}
                Dashboard{' '}
              </NavItem>
            )}
            {auth.user && 
            <>
            {auth.role === 'staff' && (
              <NavItem to= "/airports" active = {location.pathname === '/airports' ? true : false}>
                {' '}
                Airports{' '}
              </NavItem>
            )}
            {auth.role === 'staff' && (
              <NavItem to= "/airplanes" active = {location.pathname === '/airplanes' ? true : false}>
                {' '}
                Airplanes{' '}
              </NavItem>
            )}
            </>
            }
          </Flex>
        </Box>
      </Center>

      {!auth.user && (
        <Box display={{ sm: show ? 'block' : 'none', md: 'block' }} mt={{ base: 4, md: 0 }}>
          <Button bg="transparent" border="1px solid #6137FE" onClick={() => history.push('/signin')}>
            Sign In
          </Button>
          <Button bg="#6137FE" marginLeft="1rem" color="white" onClick={() => history.push('/signup')}>
            Get Started
          </Button>
        </Box>
      )}
      {auth.user && (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} leftIcon={<FiUser />}>
            {auth.user.email}
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                auth.signout()
              }}
              minH="40px"
              icon={<FiSettings />}
            >
              <span>Account Settings</span>
            </MenuItem>
            <MenuItem
              onClick={() => {
                auth.signout()
              }}
              minH="40px"
              icon={<FiCornerDownLeft />}
            >
              <span>Sign Out</span>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  )
}

export default Header
