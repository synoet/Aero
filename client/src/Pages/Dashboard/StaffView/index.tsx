import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LineGraph from '../../../components/LineGraph'
import PieGraph from '../../../components/PieGraph'
import {
  Flex,
  Divider,
  Grid,
  GridItem,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  VStack,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Collapse, useDisclosure } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import * as userService from '../../../services/user.service'
import { FiArrowRight } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

type StaffViewProps = {
  userId: string
}

const StaffView = ({ userId }: StaffViewProps) => {
  const [data, setData] = useState<any>(undefined)
  const [isEdit, setIsEdit] = useState<any>(false)
  const [selectedFlight, setSelectedFlight] = useState<any>(undefined)
  const [increment, setIncrement] = useState(0)
  const [newStatus, setNewStatus] = useState<any>(undefined)
  const [isOneOpen, onOneToggle] = useState<any>(false)
  const [isTwoOpen, onTwoToggle] = useState<any>(false)
  const [isThreeOpen, onThreeToggle] = useState<any>(false)
  const [isFourOpen, onFourToggle] = useState<any>(false)
  const [isFiveOpen, onFiveToggle] = useState<any>(false)

  const Collapsibility = [
    [isOneOpen, () => onOneToggle(!isOneOpen)],
    [isTwoOpen, () => onTwoToggle(!isTwoOpen)],
    [isThreeOpen, () => onThreeToggle(!isThreeOpen)],
    [isFourOpen, () => onFourToggle(!isFourOpen)],
    [isFiveOpen, () => onFiveToggle(!isFiveOpen)],
  ]

  const history = useHistory()

  useEffect(() => {
    userService.loadStaffData(userId).then((res: any) => {
      setData(res)
      console.log(res)
    })
  }, [increment])

  const submitUpdateStatus = (flightId: string, newStatus: string) => {
    fetch(`https://projectaero-api.herokuapp.com/flights/${flightId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    }).then(() => {
      setIncrement(increment + 1)
    })
  }

  const changeStatus = (event: any) => {
    setNewStatus(event.target.value)
  }

  return (
    <>
      {data && (
        <>
          <Modal onClose={() => setIsEdit(false)} isOpen={isEdit} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Status</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {selectedFlight && (
                  <Select onChange={changeStatus} placeholder={selectedFlight.status}>
                    {selectedFlight.status == 'on-time' && <option value="delayed">delayed</option>}
                    {selectedFlight.status == 'delayed' && <option value="on-time">on-time</option>}
                  </Select>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    setIsEdit(false)
                    submitUpdateStatus(selectedFlight.id, newStatus)
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <HeroText>Hello 👋 </HeroText>
          <SmallText>Welcome to your Staff Dashboard.</SmallText>
          <Divider marginTop="1rem" marginBottom="1rem" />
          <Flex direction="column" align="center">
            <Grid minH="600px" w="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(6, 1fr)" gap={4}>
              <GridItem rowSpan={2} colSpan={6} minH="300px">
                <Card direction="column" w="100%" h="100%">
                  <HStack justify="space-between">
                    <h1>
                      Revenue History - <Highlight>Total: ${data.revenue.totalRevenue}</Highlight>
                    </h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  <LineGraph dataPoints={data.revenue.revenueByMonths} dataKey="data" labelKey="name" />
                </Card>
              </GridItem>
              <GridItem colSpan={3} minH="300px">
                <Card direction="column" w="100%" h="100%">
                  <HStack justify="space-between">
                    <h1>Top Booking Agents</h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  {data.frequent.frquentAgents.map((agent: any) => {
                    return (
                      <Agent marginTop = '1rem' justify="space-between" padding="1rem">
                        <p>{agent.agent}</p>
                        <p>
                          Tickets Sold: <Highlight>{agent.ticketsSold}</Highlight>
                        </p>
                        <p>
                          Revenue: <Highlight>${agent.commission}</Highlight>
                        </p>
                      </Agent>
                    )
                  })}
                </Card>
              </GridItem>
              <GridItem colSpan={3} minH="300px">
                <Card direction="column" w="100%" h="100%">
                  <HStack justify="space-between">
                    <h1>Revenue Comparison</h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  <PieGraph dataPoints={data.revenue.comparison} />
                </Card>
              </GridItem>
              <GridItem rowSpan={2} colSpan={6} minH="300px">
                <Card direction="column" w="100%" h="100%">
                  <HStack>
                    <h1> Top Customers </h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  {data.frequent.frequentCustomers.map((item: any, index: number) => {
                    return (
                      <VStack w="100%" align="flex-start">
                        <Customer onClick={Collapsibility[index][1]} w="100%" marginTop="1rem" padding="1rem">
                          <h1>{item.customer}</h1>
                        </Customer>
                        <Collapse in={Collapsibility[index][0]} animateOpacity style={{ width: '100%' }}>
                          <VStack spacing={3} w="100%" padding="1rem">
                            {item.flights.map((flight: any) => {
                              return (
                                <UpcomingFlight padding="1rem" w="100%">
                                  <HStack w="100%">
                                    <p style={{ fontSize: '.8rem' }}>{flight.departure_airport_name}</p>
                                    <FiArrowRight />
                                    <p style={{ fontSize: '.8rem' }}>{flight.arrival_airport_name}</p>
                                    <Highlight style={{ fontSize: '.8rem' }}>#{flight._id}</Highlight>
                                  </HStack>
                                  <Button
                                    marginLeft="1rem"
                                    align="center"
                                    border="1px solid #6137FE"
                                    color="black"
                                    background="transparent"
                                    opacity=".6"
                                    fontSize=".8rem"
                                    onClick={() => history.push(`/flight/${flight._id}`)}
                                  >
                                    View Details
                                  </Button>
                                </UpcomingFlight>
                              )
                            })}
                          </VStack>
                        </Collapse>
                      </VStack>
                    )
                  })}
                </Card>
              </GridItem>
              <GridItem colSpan={6}>
                <Card direction="column" w="100%" h="100%">
                  <HStack justify="space-between">
                    <h1>
                      Flights <Highlight>Airline: {data.userData.airline_name}</Highlight>
                    </h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  {data.flights.length > 0 && (
                    <>
                      {data.flights.map((flight: any) => {
                        return (
                          <UpcomingFlight
                            w="100%"
                            align="center"
                            justify="space-between"
                            direction="row"
                            padding="1rem"
                            marginTop="1rem"
                          >
                            <HStack w="60%">
                              <p style={{ fontSize: '1.2rem' }}>{flight.departure_airport_name}</p>
                              <FiArrowRight />
                              <p style={{ fontSize: '1.2rem' }}>{flight.arrival_airport_name}</p>
                              <Highlight style={{ fontSize: '1rem' }}>#{flight._id}</Highlight>
                            </HStack>
                            <HStack>
                              <p>
                                Status: <Highlight>{flight.status}</Highlight>
                              </p>
                            </HStack>
                            <HStack>
                              <Button
                                marginLeft="1rem"
                                align="center"
                                border="1px solid #6137FE"
                                color="black"
                                background="transparent"
                                opacity=".6"
                                onClick={() => history.push(`/flight/${flight._id}`)}
                              >
                                View Details
                              </Button>
                              <Button
                                marginLeft="1rem"
                                align="center"
                                color="white"
                                background="#6137FE"
                                onClick={() => {
                                  setIsEdit(true)
                                  setSelectedFlight({ id: flight._id, status: flight.status })
                                }}
                              >
                                Edit Status
                              </Button>
                            </HStack>
                          </UpcomingFlight>
                        )
                      })}
                    </>
                  )}
                  {data.flights.length === 0 && (
                    <Flex align="center" justify="center" w="100%" h="100%" padding="1rem">
                      <h1>You Have No Tickets for Upcoming Flights</h1>ß
                    </Flex>
                  )}
                </Card>
              </GridItem>
              <GridItem colSpan={6}>
                <Card direction="column" h="100%" w="100%">
                  <HStack>
                    <h1>Top Destinations</h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  <VStack>
                    {data.destinations.map((destination: any, index: number) => {
                      return (
                        <UpcomingFlight marginTop = '1rem' padding="1rem" w="100%">
                          <p>
                            <Highlight>{index + 1}. </Highlight>
                            {destination}
                          </p>
                        </UpcomingFlight>
                      )
                    })}
                  </VStack>
                </Card>
              </GridItem>
            </Grid>
          </Flex>
        </>
      )}
    </>
  )
}

export default StaffView
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

const Agent = styled(Flex)`
  border: 1.5px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 10px;

  h1 {
    span {
      opacity: 0.6;
    }
  }
`

const Customer = styled(Flex)`
  border: 1.5px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 10px;
  :hover {
    cursor: pointer;
    border: 1.5px solid #6137fe;
  }
  h1 {
    font-size: 1rem;
    span {
      opacity: 0.6;
    }
  }
`
