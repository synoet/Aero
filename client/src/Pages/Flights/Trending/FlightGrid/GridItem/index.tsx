import React from 'react';
import { Box } from '@chakra-ui/react';
import styled from 'styled-components';
// "departure_location": "NWK",
// "arrival_location": "LND",
// "airline": "Jet Blue",
// "departure_time": "22:00"
const GridItem = ({data}: any) => {
    return (
        <StyledCard>
            <div className = 'flight-info'>
                <p className = 'flight-name'>{data.departure_location} - {data.arrival_location}</p>
                <p className = 'flight-time'>{data.departure_time}</p>
            </div>
            <p className = 'flight-airline'>{data.airline}</p>
        </StyledCard>
    )
}

export default GridItem;

const StyledCard = styled(Box)`
margin-top: 10px;
margin-left: 10px;
min-width: 250px;
background: #FFFFFF;
box-shadow: -3px 0px 3px rgba(0, 0, 0, 0.025), 0px -3px 3px rgba(0, 0, 0, 0.025), 3px 0px 3px rgba(0, 0, 0, 0.025), 0px 3px 3px rgba(0, 0, 0, 0.025);
border-radius: 7px;
padding-left: 1rem;
padding-right: 1rem;
padding-top: .5rem;
padding-bottom: .5rem;


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