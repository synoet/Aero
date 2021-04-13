import React, {useEffect, useState} from 'react';
import {VStack, Wrap, WrapItem } from "@chakra-ui/react"
import Layout from '../../components/Layout';
import FlightCard from './FlightCard';
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
                <Layout leftPanel = {<FlightCard departureTime = '12:00 EST' departureLocation = 'Newark NWK' arrivalTime = '18:00 EST' arrivalLocation = 'London LHR' price = {500} airline = 'Jet Blue' flightId = '123df45'></FlightCard>}></Layout>
        }
        </>
    )
}

export default Flights;

