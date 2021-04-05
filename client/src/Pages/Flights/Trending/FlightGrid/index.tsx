import React from 'react';
import { Box, SimpleGrid, Wrap, WrapItem } from "@chakra-ui/react"
import GridItem from './GridItem';
import styled from 'styled-components';
const FlightGrid = ({data}: any) => {
    return (
        <Box>
            <Title>Upcoming Flights</Title>
            <SimpleGrid columns = {2} rows ={2}>
            {data.map((flight: any) => {
                    return (
                        <WrapItem><GridItem data = {flight}></GridItem></WrapItem>
                        
                    )
                })}

            </SimpleGrid>
        </Box>
    )
}

export default FlightGrid;

const Title = styled.h1`
font-size: 1.3rem;
font-weight: 600;
`;