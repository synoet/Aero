import React, {useState, useEffect} from 'react';
import Layout from '../../../components/Layout';
import {chakra, Flex, HStack, VStack, Center} from '@chakra-ui/react';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi'
import smallcircle from '../../../images/smallcircle.svg';
import dots from '../../../images/dots.svg';

const Flight = ({match}: {match: any}) => {
    const {params: {flightId} } = match;
    const [isLoading, setIsLoading] = useState(true);
    const [flight, setFlight] = useState();
    var options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    useEffect(() => {
        fetch(`https://projectaero-api.herokuapp.com/flights/${flightId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            setFlight(res);
        }).catch((err) => console.log(err))
        .then(() => setIsLoading(false));
    }, [])

    return (    
        <>
        {(!isLoading) &&    
            <Layout>
                <FlightInfo 
                    justify='space-between'
                >
                    <VStack
                        align = 'flex-start'
                    >
                        <SubText>One Way</SubText>
                        <HStack>
                            <MainText>{flight.departure_airport_name} </MainText>
                            <ArrowIcon size = {25}/>
                            <MainText>{flight.arrival_airport_name}</MainText>
                        </HStack>
                        
                    </VStack>
                    <VStack
                        align = 'flex-end'
                    >
                        <SubText>Price</SubText>
                        <MainText>${flight.base_price}</MainText>
                    </VStack>
                </FlightInfo>
                <SelectedFlight
                    direction = 'column'
                    w = '100%'
                    padding='1rem'
                >
                    <h1>Departing Flight - {new Date(flight.departure_date).toLocaleTimeString('en-us', options)}</h1>
                    <FlightTimeInfo>
                        <HStack>
                            <Center w = '20px' h = '35px'>
                                <chakra.img src = {smallcircle}></chakra.img>
                            </Center>
                            <MediumText>{new Date(flight.departure_date).getHours() < 10 ? '0': ''}{new Date(flight.departure_date).getHours()}:{new Date(flight.departure_date).getMinutes() < 10 ? '0': ''}{new Date(flight.departure_date).getMinutes()} - {flight.departure_airport_name}</MediumText>
                        </HStack>
                        <HStack>
                            <Center w = '20px' h = '35px'>
                                <chakra.img src = {dots}></chakra.img>
                            </Center>
                            <SmallLightText>Travel Time: {new Date(flight.arrival_date).getHours() - new Date(flight.departure_date).getHours()}:00 Hours</SmallLightText>
                        </HStack>
                        <HStack>
                            <Center w = '20px' h = '35px'>
                                <chakra.img src = {smallcircle}></chakra.img>
                            </Center>
                            <MediumText>{new Date(flight.arrival_date).getHours() < 10 ? '0': ''}{new Date(flight.arrival_date).getHours()}:{new Date(flight.arrival_date).getMinutes() < 10 ? '0': ''}{new Date(flight.arrival_date).getMinutes()} - {flight.arrival_airport_name}</MediumText>
                        </HStack>
                    </FlightTimeInfo>
                </SelectedFlight>

            </Layout>
        }
        </>
    )

}

export default Flight;

const MainText = styled.p`
font-size: 2rem;
font-weight: 500;
`

const SubText = styled.p`
font-size: 1.3rem;
color: #AAAAAA
`;

const SmallLightText = styled.p`
font-size: 1rem;
color: #AAAAAA
`;

const MediumText = styled.p`
font-size: 1.2rem;
`;

const FlightInfo = styled(HStack)``;

const ArrowIcon = styled(FiArrowRight)``;

const FlightTimeInfo = styled.div`
margin-top: 1rem;
margin-left: 1rem;
`;

const SelectedFlight = styled(Flex)`
margin-top: 1rem;
border: 1.5px solid #E9E9E9;
box-sizing: border-box;
border-radius: 10px;

h1 {
    font-size: 1.2rem;
    font-weight: 500;
}
`;