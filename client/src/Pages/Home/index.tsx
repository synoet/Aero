import React from 'react';
import Layout from '../../components/Layout';
import {chakra, Flex} from '@chakra-ui/react';
import styled from 'styled-components';
import TextLoop from "react-text-loop";
import FlightSearch from '../Flights/FlightSearch';
import background from '../../images/background.svg';
const Home = () => {
    return (
        <Layout>
            <HeroFlex 
                w = '100%'
                align = 'center'
                direction = 'column'
            >
                <chakra.img  w = '100%'  h = '300px' src = {background}/>
                <HeroText>
                    Fly to your
                    <TextLoop>
                        <Loops> Dream Vacation</Loops>
                        <Loops> Family Get Together</Loops>
                        <Loops> Coorprate Retreat</Loops>
                        <Loops> Wedding</Loops>
                    </TextLoop>
                </HeroText>
                <Flex
                    align = 'center'
                    w = '80%'
                    marginTop= '1rem'
                >
                    <Search />

                </Flex>

            </HeroFlex>

        </Layout>
    )
}

export default Home;

const HeroFlex = styled(Flex)``;

const HeroText = styled.h1`
font-size: 2.5rem;
margin-top: -5rem;
`;

const Loops = styled.span`
margin-left: 1rem;
color: #6137FE;
`;

const Search = styled(FlightSearch)`
`;