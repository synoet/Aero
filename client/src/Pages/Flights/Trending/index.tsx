import React from 'react';
import FlightGrid from './FlightGrid';
import {Box, Wrap, WrapItem} from '@chakra-ui/react';
const Trending = ({data}: {data: any}) => {
    return (
        <Box>
            <Wrap direction = "row" spacing = {'2rem'}>
                <WrapItem>
                    <FlightGrid title = {'Upcoming Flights'} data = {data.upcomingFlights}></FlightGrid>
                </WrapItem>
                <WrapItem>
                    <FlightGrid title = {'Delayed Flights'} data = {data.delayedFlights}></FlightGrid>
                </WrapItem>

            </Wrap>

        </Box>

    )
}

export default Trending;