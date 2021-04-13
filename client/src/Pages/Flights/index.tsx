import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import FlightList from './FlightList';
import {Center} from '@chakra-ui/react';

const Flights = () => {
    const [allFlights, setAllFlights] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`https://projectaero-api.herokuapp.com/flightsview`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            setAllFlights(res.allFlights);
            console.log(res);
        }).catch((err) => console.log(err))
        .then(() => setIsLoading(false));
    }, [])

    return (
        <>
        {!isLoading && 
                <Layout leftPanel = {<FlightList flights = {allFlights} />}>
                </Layout>
        }
        </>
    )
}

export default Flights;

