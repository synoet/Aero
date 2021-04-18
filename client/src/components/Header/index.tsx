import React, {useState} from 'react';
import { Box, Heading, Flex, Button, chakra, Center } from "@chakra-ui/react";
import logotype from '../../images/logotype.svg';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import MenuItem from './MenuItem';
const Header = (props: any) => {
    const [show, setShow] = useState(false)
    const handleToggle = () => setShow(!show);

    const history = useHistory();

    const location = useLocation();
    console.log(location.pathname);
    
    return (
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          width = "100%"
          maxW = "1200px"
        >
          <Flex align="center" mr={5}>
            <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
              <chakra.img h = '50px' src = {logotype}/>
            </Heading>
          </Flex>
          <Center>
            <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
                <svg
                fill="black"
                width="12px"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
            </Box>
            <Flex>

            </Flex>
        
            <Box
                display={{ sm: show ? "block" : "none", md: "flex" }}
                width={{ sm: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
            >
                <Flex>
                    <MenuItem to="/home" active = {location.pathname === '/home' ? true : false}> Home </MenuItem>
                    <MenuItem to="/flights" active = {location.pathname === '/flights' ? true : false}> Flights </MenuItem>
                    <MenuItem to="/destinations" active = {location.pathname === '/destinations' ? true : false}> Destinations </MenuItem>
                    <MenuItem to="/airports" active = {location.pathname === '/airports' ? true : false}> Airports </MenuItem>
                    <MenuItem to="/airlines" active = {location.pathname === '/airlines' ? true : false}> Airlines </MenuItem>
                </Flex>
            </Box>
          </Center>
    

    
          <Box
            display={{ sm: show ? "block" : "none", md: "block" }}
            mt={{ base: 4, md: 0 }}
          >
            <Button bg = "transparent" border = '1px solid #6137FE' onClick = {() => history.push('/signin')}>
                Sign In
            </Button>
            <Button bg="#6137FE"  marginLeft = '1rem' color="white" onClick = {() => history.push('/signup')}>
              Get Started
            </Button>
          </Box>
        </Flex>
    )

}

export default Header;