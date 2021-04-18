import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import FlightList from './FlightList';
import {Center, Spinner, Flex} from '@chakra-ui/react';
import FlightSearch from './FlightSearch';

const Flights = () => {
    const [allFlights, setAllFlights] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`https://projectaero-api.herokuapp.com/flights`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            setAllFlights(res);
            console.log(res);
        }).catch((err) => console.log(err))
        .then(() => setIsLoading(false));
    }, [])

    return (
        <>
        {!isLoading && 
                <Layout leftPanel = {<FlightList flights = {allFlights} />}>

                    <FlightSearch></FlightSearch>
                </Layout>
        }
        {isLoading &&
            <Flex w = '100vw' h = '100vh' align = 'center' justify= 'center'>
                <Spinner size='xl' speed="2s" color = '#6137FE' />
            </Flex>
            
        }
        </>
    )
}

export default Flights;

