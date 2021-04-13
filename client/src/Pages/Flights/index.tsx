import React, {useEffect, useState} from 'react';
import {VStack, Wrap, WrapItem } from "@chakra-ui/react"
import Layout from '../../components/Layout';

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
        }).catch((err) => console.log(err))
        .then(() => setIsLoading(false));
    }, [])

    return (
        <>
        {!isLoading && 
                <Layout
            ></Layout>
        }
        </>
    )
}

export default Flights;

