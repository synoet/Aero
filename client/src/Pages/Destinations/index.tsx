import React, {useEffect, useState} from 'react';
import {Flex, Center, Box, SimpleGrid, Divider} from '@chakra-ui/react';
import styled from 'styled-components';
import Layout from '../../components/Layout'
import DestinationCard from './DestinationCard';

const Destinations = () => {
    const [allDestinations, setAllDestinations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`https://projectaero-api.herokuapp.com/destinations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            setAllDestinations(res);
            console.log(res);
        }).catch((err) => console.log(err))
        .then(() => setIsLoading(false));
    }, [])
    return (
        <Layout>
            <Header>Destinations</Header>
            <Divider marginTop ='1rem' marginBottom = '1rem'/>
            <SimpleGrid columns = {3} spacing = {'2rem'} w = '100%'>
                {allDestinations.map((Destination: any) => {
                    return(
                        <DestinationCard Destination ={Destination} />
                    )
                })}
            </SimpleGrid>
        </Layout>
    )
}

export default Destinations;

const Header = styled.h1`
font-size: 2rem;
font-weight: 500;
`;