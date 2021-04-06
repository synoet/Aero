import React from 'react';
import { Box, SimpleGrid} from "@chakra-ui/react"
import GridItem from './GridItem';
import styled from 'styled-components';
const FlightGrid = ({data, title}: any) => {
    return (
        <FlightWrapper>
            <Title>{title}</Title>
            <SimpleGrid spacing  = {'.5rem'} columns = {2} rows ={2}>
            {data.map((flight: any) => {
                    return (
                        <GridItem data = {flight}></GridItem>
                        
                    )
                })}

            </SimpleGrid>
        </FlightWrapper>
    )
}

export default FlightGrid;

const Title = styled.h1`
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
`;

const FlightWrapper = styled(Box)`

`;