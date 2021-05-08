import React, { useState } from 'react'
import {
  Flex,
  HStack,
  VStack,
  Button,
  Input,
  InputGroup,
  Center,
  InputLeftElement,
  InputLeftAddon,
} from '@chakra-ui/react'
import { FiCalendar, FiSearch, FiHome, FiMapPin, FiMap } from 'react-icons/fi'
import { useScreenType } from '../../../hooks/useScreenType'

import styled from 'styled-components'

const FlightSearch = ({callback}: {callback?: (flights: any) => {} | void}) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [depLocation, setDepLocation] = useState('');
  const [arrivalLocation, setArrivalLocation] = useState('');

  const screenType = useScreenType()

  const handleStartDate = () => {}

  const searchFlight = () => {
    console.log(startDate, endDate, depLocation, arrivalLocation);
    fetch(`https://projectaero-api.herokuapp.com/flights/search/${(startDate === '' || startDate === 'none') ? 'none' : startDate}/${(endDate === '' || endDate === 'none') ? 'none' : endDate}/${depLocation === '' || depLocation === 'none' ? 'none' : depLocation}/${arrivalLocation === '' || arrivalLocation === 'none' ? 'none' : arrivalLocation}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    }).then((res) => res.json()).then((res) => {
      if (callback) callback(res)
    }).catch(error => console.log(error));
  }

  const handleEndDate = () => {}
  return (
    <SearchFlex w="100%" direction="column" minH="120px" padding="1.5rem">
      <h2>Search for Flights</h2>
      <FormWrapper
        direction={screenType === 's' || screenType === 'xs' ? 'column' : 'row'}
        justify="space-between"
        marginBottom="1rem"
      >
        <Location
          w={screenType === 's' || screenType === 'xs' ? '100%' : '49%'}
          marginBottom={screenType === 's' || screenType === 'xs' ? '1rem' : '0'}
        >
          <InputGroup>
            <InputLeftAddon pointerEvents="none" children={<FiHome />} />
            <Input value = {depLocation} onChange = {(event: any) => {setDepLocation(event.target.value)}} size="md" placeholder="From?" />
          </InputGroup>

          <InputGroup>
            <InputLeftAddon pointerEvents="none" children={<FiMapPin />} />
            <Input size="md" value = {arrivalLocation} onChange = {(event: any) => {setArrivalLocation(event.target.value)}} placeholder="Where To?" />
          </InputGroup>
        </Location>
        <DateWrapper w={screenType === 's' || screenType === 'xs' ? '100%' : '49%'}>
          <InputGroup>
            <InputLeftAddon pointerEvents="none" children={<FiCalendar />} />
            <Input size="md" value = {endDate} onChange = {(event) => {setStartDate(event.target.value)}}placeholder="Start Date? (dd/mm/yy)" />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon pointerEvents="none" children={<FiCalendar />} />
            <Input value = {endDate} onChange = {(event) => {setEndDate(event.target.value)}}size="md" placeholder="End Date? (dd/mm/yy)" />
          </InputGroup>
        </DateWrapper>
      </FormWrapper>
      <Center>
        <Button
          bg="#6137FE"
          color="white"
          borderRadius="50px"
          padding="10px 15px 10px 15px"
          position="absolute"
          bottom="-1rem"
          onClick = {() => {
            searchFlight()
          }}
        >
          <FiSearch style={{ marginRight: '10px' }}></FiSearch>
          Search
        </Button>
      </Center>
    </SearchFlex>
  )
}

export default FlightSearch

const SearchFlex = styled(Flex)`
  background: #ffffff;
  box-shadow: -12.0195px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px -12.0195px 12.0195px rgba(0, 0, 0, 0.03),
    12.0482px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px 12.0195px 12.0195px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  margin-bottom: 4rem;
  position: relative;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`

const Location = styled(HStack)``
const DateWrapper = styled(HStack)``
const FormWrapper = styled(Flex)``
