import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { FiExternalLink } from 'react-icons/fi'
import LineGraph from '../../../components/LineGraph'
import { Flex, Divider, Grid, GridItem, HStack, Button } from '@chakra-ui/react'
import ReactStarRatingComponent from 'react-star-rating-component'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  InputGroup,
  Input,
  VStack,
  ModalCloseButton,
} from '@chakra-ui/react'
import styled from 'styled-components'
import { useAuth } from '../../../hooks/useAuth'
import * as userService from '../../../services/user.service'
import { useHistory } from 'react-router-dom'
import Flight from '../../Flight/[id]'

type CustomerViewProps = {
  userId: string
}

const CustomerView = ({ userId }: CustomerViewProps) => {
  const [data, setData] = useState<any>()
  const [isEdit, setIsEdit] = useState<any>(false)
  const [increment, setIncrement] = useState(0)
  const [commentary, setCommentary] = useState('')
  const [ratings, setRatings] = useState(0)
  const [flightId, setFlightId] = useState('')
  const auth = useAuth()
  const history = useHistory()
  useEffect(() => {
    userService.loadCustomerData(userId).then((res: any) => {
      setData(res)
      console.log(res)
    })
  }, [increment])

  const createRating = () => {
    fetch(`https://projectaero-api.herokuapp.com/flights/createRating`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        customer_email: auth.user.email,
        commentary: commentary,
        ratings: ratings,
        flight_id: flightId,
        user_id: auth.user._id,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setIncrement(increment + 1)
      })
      .catch(error => console.log(error))
  }
  return (
    <>
      {data && (
        <>
          <Modal onClose={() => setIsEdit(false)} isOpen={isEdit} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Rate Flight</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={5}>
                  <HStack w="100%">
                    <p>Rating: </p>
                    <ReactStarRatingComponent
                      name="ratings"
                      onStarClick={(nextValue, prevValue, name) => {
                        setRatings(nextValue)
                      }}
                      starCount={5}
                      editing={true}
                      value={ratings}
                      starColor="#6137FE"
                    />
                  </HStack>
                  <Input
                    placeholder="Comments"
                    value={commentary}
                    onChange={(event: any) => {
                      setCommentary(event.target.value)
                    }}
                  />
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    setIsEdit(false)
                    createRating()
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <HeroText>
            Hello 👋 <Highlight>{auth.user.name}</Highlight>
          </HeroText>
          <SmallText>Welcome to your Customer Dashboard.</SmallText>
          <Divider marginTop="1rem" marginBottom="1rem" />
          <Flex direction="column" align="center">
            <Grid minH="600px" w="100%" templateColumns="repeat(6, 1fr)" gap={4}>
              <GridItem colSpan={3}>
                <Card direction="column" w="100%" h="100%">
                  <HStack justify="space-between">
                    <h1>Upcoming Flights</h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  {data.flights.upcomingFlights.map((flight: any) => {
                    return (
                      <UpcomingFlight
                        w="100%"
                        align="center"
                        justify="space-between"
                        direction="row"
                        padding="1rem"
                        marginTop="1rem"
                      >
                        <HStack>
                          <p style={{ fontSize: '1.2rem' }}>{flight.flight.departure_airport_name}</p>
                          <FiArrowRight />
                          <p style={{ fontSize: '1.2rem' }}>{flight.flight.arrival_airport_name}</p>
                        </HStack>
                        <HStack>
                          <Button
                            align="center"
                            border="1px solid #6137FE"
                            color="black"
                            background="transparent"
                            opacity=".6"
                            onClick={() => {
                              history.push(`/flight/${flight.flight._id}`)
                            }}
                          >
                            View Details
                          </Button>
                        </HStack>
                      </UpcomingFlight>
                    )
                  })}
                </Card>
              </GridItem>
              <GridItem colSpan={3} minHeight="300px">
                <Card direction="column" w="100%" h="100%">
                  <HStack justify="space-between">
                    <h1>Spending History</h1>
                  </HStack>

                  <Divider marginTop="1rem" marginBottom="1rem" />
                  <LineGraph dataPoints={data.spending.spendingByMonths} dataKey="data" labelKey="name" />
                </Card>
              </GridItem>
              <GridItem colSpan={6}>
                <Card direction="column" w="100%" h="100%">
                  <HStack justify="space-between">
                    <h1>Previous Flights</h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  {data.flights.previousFlights.map((flight: any) => {
                    return (
                      <UpcomingFlight
                        w="100%"
                        align="center"
                        justify="space-between"
                        direction="row"
                        padding="1rem"
                        marginTop="1rem"
                      >
                        <HStack>
                          <p style={{ fontSize: '1.2rem' }}>{flight.flight.departure_airport_name}</p>
                          <FiArrowRight />
                          <p style={{ fontSize: '1.2rem' }}>{flight.flight.arrival_airport_name}</p>
                        </HStack>
                        <HStack>
                          {flight.ratings !== null && (
                            <ReactStarRatingComponent
                              name="ratings"
                              starCount={5}
                              editing={false}
                              value={flight.ratings.ratings}
                              starColor="#6137FE"
                            />
                          )}
                          {flight.ratings === null && (
                            <Button
                              align="center"
                              color="white"
                              background="#6137FE"
                              onClick={() => {
                                setIsEdit(true)
                                setFlightId(flight.flight._id)
                              }}
                            >
                              Rate
                            </Button>
                          )}
                          <Button
                            align="center"
                            border="1px solid #6137FE"
                            color="black"
                            background="transparent"
                            opacity=".6"
                            onClick={() => {
                              history.push(`/flight/${flight.flight._id}`)
                            }}
                          >
                            View Details
                          </Button>
                        </HStack>
                      </UpcomingFlight>
                    )
                  })}
                </Card>
              </GridItem>
            </Grid>
          </Flex>
        </>
      )}
    </>
  )
}

export default CustomerView

const HeroText = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`

const SmallText = styled.p`
  opacity: 0.6;
`
const Highlight = styled.span`
  color: #6137fe;
`

const Card = styled(Flex)`
  border: 1.5px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 1rem;

  h1 {
    font-size: 1.2rem;
    font-weight: 500;
  }
`
const UpcomingFlight = styled(Flex)`
  border: 1.5px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 10px;

  h1 {
    span {
      opacity: 0.6;
    }
  }
`
