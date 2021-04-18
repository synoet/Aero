import React from 'react';
import Layout from '../../components/Layout';
import {Flex} from '@chakra-ui/react';
import styled from 'styled-components';
import TextLoop from "react-text-loop";
import FlightSearch from '../Flights/FlightSearch';
const Home = () => {
    return (
        <Layout>
            <HeroFlex 
                w = '100%'
                align = 'center'
                direction = 'column'
            >
                <HeroText>
                    Book a Flight To Your Next 
                    <TextLoop>
                        <Loops> Dream Vacation 🌴</Loops>
                        <Loops> Family Get Together 👪</Loops>
                        <Loops> Coorprate Retreat 🤝</Loops>
                        <Loops> Wedding 👰</Loops>
                    </TextLoop>
                </HeroText>
                <Flex
                    align = 'center'
                    padding = '3rem'
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
font-size: 3rem;
`;

const Loops = styled.span`
margin-left: 1rem;
color: #6137FE;
`;

const Search = styled(FlightSearch)`
`;