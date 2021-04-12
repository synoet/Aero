import React from  'react';
import {
    Table,
    Thead,
    Tr,
    Th,
    Td,
    Button
  } from "@chakra-ui/react"
import styled from 'styled-components';

const FlightList = ({data}: {data: any}) => {
    return (
      <div>
        <Title>Flights</Title>
        <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Flight Id</Th>
            <Th>Price</Th>
            <Th>Departure Time</Th>
            <Th>Arrival Time</Th>
            <Th>Departure Airport</Th>
            <Th>Arrival Airport</Th>
            <Th>Airline</Th>
            <Th>Buy</Th>
          </Tr>
          {data.map((flight: any) => {
            const departureDate = new Date(flight.departure_date)
            const departureTime = `${departureDate.getHours() < 10 ? '0': ''}${departureDate.getHours()}:${departureDate.getMinutes() < 10 ? '0': ''}${departureDate.getMinutes()}`;
            const arrivalTime = `${departureDate.getHours() < 10 ? '0': ''}${departureDate.getHours()}:${departureDate.getMinutes() < 10 ? '0': ''}${departureDate.getMinutes()}`;
              return (
                  <Tr>
                      <Td>{flight.flight_number}</Td>
                      <Td>{flight.base_price}$</Td>
                      <Td>{departureTime}</Td>
                      <Td>{arrivalTime}</Td>
                      <Td>{flight.departure_airport_name}</Td>
                      <Td>{flight.arrival_airport_name}</Td>
                      <Td>{flight.airline_name}</Td>
                      <Td><Button bg = "#6137FE" color="white">Buy</Button></Td>

                  </Tr>
              )
          })}
        </Thead>
      </Table>

      </div>

    )

}
export default FlightList;

const Title = styled.h1`
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
`;