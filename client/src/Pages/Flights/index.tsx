import React, {useEffect, useState} from 'react';
import {VStack, Wrap, WrapItem } from "@chakra-ui/react"
import FlightList from './FlightList';
import Trending from './Trending';
import Layout from '../../components/Layout';

const Flights = () => {
    const [delayedFlights, setDelayedFlights] = useState();
    const [upcomingFlights, setUpcomingFlights] = useState();
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
            setDelayedFlights(res.delayedFlights);
            setAllFlights(res.allFlights);
            setUpcomingFlights(res.upcomingFlights);
            console.log(res);
        }).catch((err) => console.log(err))
        .then(() => setIsLoading(false));
    }, [])

    return (
        <>
        {!isLoading && 
                <Layout
                leftPanel = {<FlightList data = {allFlights}></FlightList>}
                // rightPanel = {<Trending data = {{upcomingFlights: upcomingFlights, delayedFlights: delayedFlights}}></Trending>}
            ></Layout>
        }
        </>

        // <VStack>
        //     {!isLoading && 
        //     <Wrap spacing = {"3rem"} direction = "column">
        //         <WrapItem>
        //             <Trending data = {{upcomingFlights: upcomingFlights, delayedFlights: delayedFlights}}></Trending>
        //         </WrapItem>
        //         <WrapItem>
        //             <FlightList data = {allFlights}></FlightList>
        //         </WrapItem>
        //     </Wrap>
        //     }
        // </VStack>
    )
}

export default Flights;

