import React from 'react';
import {VStack, Wrap, WrapItem } from "@chakra-ui/react"
import FlightList from './FlightList';
import Trending from './Trending';
import Navbar from '../../Components/Navbar'

const Flights = () => {
    return (
        <VStack>
            <Navbar></Navbar>
            <Wrap spacing = {"3rem"} direction = "column">
                <WrapItem>
                    <Trending></Trending>
                </WrapItem>
                <WrapItem>
                    <FlightList></FlightList>
                </WrapItem>
            </Wrap>
        </VStack>
    )
}

export default Flights;

