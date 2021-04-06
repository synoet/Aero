import React from  'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button
  } from "@chakra-ui/react"
import styled from 'styled-components';
import data from './dummy.json';

const FlightList = () => {
    console.log(data);
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
          {data.map(flight => {
              return (
                  <Tr>
                      <Td>{flight.flight_id}</Td>
                      <Td>{flight.price}$</Td>
                      <Td>{flight.departure_time}</Td>
                      <Td>{flight.arrival_time}</Td>
                      <Td>{flight.departure_airport}</Td>
                      <Td>{flight.arrival_airport}</Td>
                      <Td>{flight.airline}</Td>
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