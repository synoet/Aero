import React, {useEffect, useState} from 'react';
import {VStack, Wrap, WrapItem } from "@chakra-ui/react"
import FlightList from './FlightList';
import Trending from './Trending';
import Navbar from '../../Components/Navbar'

const Flights = () => {
    const [delayedFlights, setDelayedFlights] = useState();
    const [upcomingFlights, setUpcomingFlights] = useState();
    const [allFlights, setAllFlights] = useState();

    useEffect(() => {
        fetch(`https://projectaero-api.herokuapp.com/flightsview`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => res.json())
        .then((res) => {
            setDelayedFlights(res.delayedFlights);
            setAllFlights(res.allFlights);
            setUpcomingFlights(res.upcomingFlights);
            console.log(res);
        }).catch((err) => console.log(err))
    })

    return (
        <VStack>
            <Wrap spacing = {"3rem"} direction = "column">
                <WrapItem>
                    <Navbar></Navbar>
                </WrapItem>
                <WrapItem>
                    <Trending></Trending>
                </WrapItem>
                <WrapItem>
                    <FlightList></FlightList>
                </WrapItem>
            </Wrap>
        </VStack>
    )
}

export default Flights;

