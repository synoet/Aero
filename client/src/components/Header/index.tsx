import React, {useState} from 'react';
import { Box, Heading, Flex, Button, chakra, Center } from "@chakra-ui/react";
import logotype from '../../images/logotype.svg';


import MenuItem from './MenuItem';
const Header = (props: any) => {
    const [show, setShow] = useState(false)
    const handleToggle = () => setShow(!show);
    
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
                    <MenuItem to="/"> Home </MenuItem>
                    <MenuItem to="/Flights"> Flights </MenuItem>
                    <MenuItem to="/Flights"> Destinations </MenuItem>
                    <MenuItem to="/Flights"> Airports </MenuItem>
                    <MenuItem to="/Flights"> Airlines </MenuItem>
                </Flex>
            </Box>
          </Center>
    

    
          <Box
            display={{ sm: show ? "block" : "none", md: "block" }}
            mt={{ base: 4, md: 0 }}
          >
            <Button bg = "transparent">
                Sign In
            </Button>
            <Button bg="#6137FE"  color="white">
              Get Started
            </Button>
          </Box>
        </Flex>
    )

}

export default Header;