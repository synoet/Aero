import React from 'react';
import FlightGrid from './FlightGrid';
import {Box, Wrap, WrapItem} from '@chakra-ui/react';
import data from './dummy.json';
const Trending = () => {
    return (
        <Box>
            <Wrap direction = "row" spacing = {'2rem'}>
                <WrapItem>
                    <FlightGrid title = {'Upcoming Flights'} data = {data}></FlightGrid>
                </WrapItem>
                <WrapItem>
                    <FlightGrid title = {'Delayed Flights'} data = {data}></FlightGrid>
                </WrapItem>

            </Wrap>

        </Box>

    )
}

export default Trending;