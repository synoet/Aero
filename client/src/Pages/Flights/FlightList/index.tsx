import { VStack } from '@chakra-ui/layout';
import React from 'react';
import FlightCard from '../FlightCard';

const FlightList = ({flights}: {flights: any}) => {

    return (
        <VStack
            spacing = '1.5rem'
        >
            {flights.map((flight: any) => {
                const departureDate = new Date(flight.departure_date)
                const arrivalDate = new Date(flight.arrival_date)
                return (
                    <FlightCard 
                        departureTime = {`${departureDate.getHours() < 10 ? '0' : ''}${departureDate.getHours()}:${departureDate.getMinutes() < 10 ? '0': ''}${departureDate.getMinutes()}`}
                        arrivalTime = {`${arrivalDate.getHours() < 10 ? '0' : ''}${arrivalDate.getHours()}:${arrivalDate.getMinutes() < 10 ? '0': ''}${arrivalDate.getMinutes()}`}
                        departureLocation = {flight.departure_airport_name}
                        arrivalLocation = {flight.arrival_airport_name}
                        price = {flight.base_price}
                        airline = {flight.airline_name}
                        flightId = {flight.flight_number}
                    />
                )
            })}
        </VStack>
    )
}

export default FlightList;