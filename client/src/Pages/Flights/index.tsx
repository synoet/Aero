import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import FlightList from './FlightList'
import { useAuth } from '../../hooks/useAuth'
import styled from 'styled-components'
import { Center, Spinner, Flex, HStack, VStack } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  InputGroup,
  Input,
  ModalCloseButton,
} from '@chakra-ui/react'
import FlightSearch from './FlightSearch'
import { FiPlusSquare } from 'react-icons/fi'

const Flights = () => {
  const [allFlights, setAllFlights] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isEdit, setIsEdit] = useState<any>(false)
  const [increment, setIncrement] = useState<any>(0)
  const [arrivalAirport, setArrivalAirport] = useState('')
  const [departureAirport, setDepartureAirport] = useState('')
  const [price, setPrice] = useState(0)
  const [airplaneId, setAirplaneId] = useState('')

  const auth = useAuth()

  useEffect(() => {
    fetch(`https://projectaero-api.herokuapp.com/flights`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setAllFlights(res)
        console.log(res)
      })
      .catch(err => console.log(err))
      .then(() => setIsLoading(false))
  }, [increment])

  const createFlight = () => {
    fetch(`https://projectaero-api.herokuapp.com/flights`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        airline_name: auth.user.airline_name,
        arrival_airport_name: arrivalAirport,
        departure_airport_name: departureAirport,
        base_price: price,
        airplane_id: airplaneId,
        status: 'on-time',
      }),
    })
      .then(res => {
        console.log(res)
        setIncrement(increment + 1)
      })
      .catch(err => console.log(err))
  }

  const isCompleted = (): boolean => {
    if (arrivalAirport && departureAirport && airplaneId !== '' && price != 0) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {!isLoading && (
        <Layout leftPanel={<FlightList flights={allFlights} />}>
          <Modal onClose={() => setIsEdit(false)} isOpen={isEdit} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add new Flight</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={5}>
                  <InputGroup>
                    <Input placeholder={auth.user.airline_name} isDisabled={true}></Input>
                  </InputGroup>
                  <InputGroup>
                    <Input
                      value={arrivalAirport}
                      onChange={event => {
                        setArrivalAirport(event.target.value)
                      }}
                      placeholder="Arrival Airport Name"
                    ></Input>
                  </InputGroup>
                  <InputGroup>
                    <Input
                      value={departureAirport}
                      onChange={event => {
                        setDepartureAirport(event.target.value)
                      }}
                      placeholder="Departure Airport Name"
                    ></Input>
                  </InputGroup>
                  <InputGroup>
                    <Input
                      value={price}
                      onChange={event => {
                        setPrice(parseInt(event.target.value))
                      }}
                      placeholder="Base Price"
                    ></Input>
                  </InputGroup>
                  <InputGroup>
                    <Input
                      value={airplaneId}
                      onChange={event => {
                        setAirplaneId(event.target.value)
                      }}
                      placeholder="Airplane Id"
                    ></Input>
                  </InputGroup>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    setIsEdit(false)
                    createFlight()
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <HStack marginBottom="2rem" justify="space-between" w="100%">
            <HeroText>Airports</HeroText>
            {auth.role === 'staff' && (
              <Add onClick={() => setIsEdit(true)}>
                <PlusIcon className="PlusIcon" />
                <p>Add Flight</p>
              </Add>
            )}
          </HStack>
          <FlightSearch callback = {(flights) => {setAllFlights(flights)}}></FlightSearch>
        </Layout>
      )}
      {isLoading && (
        <Flex w="100vw" h="100vh" align="center" justify="center">
          <Spinner size="xl" speed="2s" color="#6137FE" />
        </Flex>
      )}
    </>
  )
}

export default Flights

const HeroText = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`
const Add = styled(HStack)`
  background-color: #6137fe;
  padding: 0.6rem 1rem 0.6rem 1rem;
  color: white;
  border-radius: 2rem;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const PlusIcon = styled(FiPlusSquare)`
  width: 20px;
  height: 20px;
`
