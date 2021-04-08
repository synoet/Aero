import React from 'react';
import { Box, chakra } from '@chakra-ui/react';
import styled from 'styled-components';
import arrow from '../../../../../images/arrow.svg';


const GridItem = ({data}: any) => {
    const departureDate = new Date(data.departure_date)
    const departureTime = `${departureDate.getHours() < 10 ? '0': ''}${departureDate.getHours()}:${departureDate.getMinutes() < 10 ? '0': ''}${departureDate.getMinutes()}`;

    return (
        <StyledCard>
            <div className = 'flight-info'>
                <p className = 'flight-name'>{data.departure_airport_name} <Icon src = {arrow} /> {data.arrival_airport_name}</p>
                <p className = 'flight-time'>{departureTime}</p>
            </div>
            <p className = 'flight-airline'>{data.airline_name}</p>
        </StyledCard>
    )
}

export default GridItem;

const StyledCard = styled(Box)`
margin-top: 10px;
margin-left: 10px;
min-width: 250px;
background: #FFFFFF;
box-shadow: -6px 0px 6px rgba(0, 0, 0, 0.05), 0px -6px 6px rgba(0, 0, 0, 0.05), 6px 0px 6px rgba(0, 0, 0, 0.05), 0px 6px 6px rgba(0, 0, 0, 0.05);
border-radius: 7px;
padding-left: 1rem;
padding-right: 1rem;
padding-top: .5rem;
padding-bottom: .5rem;
border: 1px solid transparent;

:hover {
    border: 1px solid #6137FE;
    cursor: pointer;
}

.flight-info {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .flight-name {
        font-weight: 600;
        font-size: 1.2rem;
    }

    .flight-time {
        color: #6137FE;
    }
}

.flight-airline {
    color: #6137FE;
    font-size: .9rem;
}
`;


const Icon = styled(chakra.img)`
height: 15px;
display: inline-block;
vertical-align: middle;
`;