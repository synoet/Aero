import React, { useEffect, useState } from 'react'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import LineGraph from '../../../components/LineGraph'
import { FiExternalLink } from 'react-icons/fi'
import { Flex, Divider, Grid, GridItem, HStack, Button } from '@chakra-ui/react'
import styled from 'styled-components'
import * as userService from '../../../services/user.service'

type AgentViewProps = {
  userId: string
}

const AgentView = ({ userId }: AgentViewProps) => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    userService.loadAgentData(userId).then((res: any) => {
      setData(res)
      console.log(res)
    })
  }, [])
  return (
    <>
      {data && (
        <>
          <HeroText>Hello 👋 </HeroText>
          <SmallText>Welcome to your Agent Dashboard.</SmallText>
          <Divider marginTop="1rem" marginBottom="1rem" />
          <Flex direction="column" align="center">
            <Grid minH="600px" w="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(6, 1fr)" gap={4}>
              <GridItem colSpan={6} minH="300px">
                <Card direction="column" w="100%" h="100%">
                  <HStack justify="space-between">
                    <h1>
                      Spending History - <Highlight>Total: ${data.spending.totalSpending}</Highlight>
                    </h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  <LineGraph dataPoints={data.spending.spendingByMonths} dataKey="data" labelKey="name" />
                </Card>
              </GridItem>
              <GridItem colSpan={6} minH="300px">
                <Card direction="column" w="100%" h="100%">
                  <HStack justify="space-between">
                    <h1>
                      Revenue History - <Highlight>Total: ${data.revenue.revenueSpending}</Highlight>
                    </h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  <LineGraph dataPoints={data.revenue.revenueByMonths} dataKey="data" labelKey="name" />
                </Card>
              </GridItem>
              <GridItem colSpan={6}>
                <Card direction="column" w="100%" h="100%">
                  <HStack justify="space-between">
                    <h1>
                      Tickets for Upcoming Flights <Highlight>(Unsold)</Highlight>
                    </h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  {data.flights.upcomingFlights.length > 0 && (
                    <>
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
                              <p style={{ fontSize: '1.2rem' }}>{flight.departure_airport_name}</p>
                              <FiArrowRight />
                              <p style={{ fontSize: '1.2rem' }}>{flight.arrival_airport_name}</p>
                            </HStack>
                            <HStack>
                              <p>
                                Base Price: <Highlight>${flight.base_price}</Highlight> - Your Commission:{' '}
                                <Highlight>${data.userData.commission}</Highlight>{' '}
                              </p>
                            </HStack>
                            <HStack>
                              <Button
                                align="center"
                                border="1px solid #6137FE"
                                color="black"
                                background="transparent"
                                opacity=".6"
                              >
                                View Details
                              </Button>
                            </HStack>
                          </UpcomingFlight>
                        )
                      })}
                    </>
                  )}
                  {data.flights.upcomingFlights.length === 0 && (
                    <Flex align="center" justify="center" w="100%" h="100%" padding="1rem">
                      <h1>You Have No Tickets for Upcoming Flights</h1>
                    </Flex>
                  )}
                </Card>
              </GridItem>
              <GridItem colSpan={6}>
                <Card direction="column" w="100%" h="100%">
                  <HStack justify="space-between">
                    <h1>
                      Tickets for Previous Flights <Highlight>(Unsold)</Highlight>
                    </h1>
                  </HStack>
                  <Divider marginTop="1rem" marginBottom="1rem" />
                  {data.flights.previousFlights.length > 0 && (
                    <>
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
                            <HStack w="30%">
                              <p style={{ fontSize: '1.2rem' }}>{flight.departure_airport_name}</p>
                              <FiArrowRight />
                              <p style={{ fontSize: '1.2rem' }}>{flight.arrival_airport_name}</p>
                            </HStack>
                            <HStack>
                              <p>
                                Base Price: <Highlight>${flight.base_price}</Highlight> - Your Commission:{' '}
                                <Highlight>${data.userData.commission}</Highlight>{' '}
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
                              >
                                View Details
                              </Button>
                            </HStack>
                          </UpcomingFlight>
                        )
                      })}
                    </>
                  )}
                  {data.flights.previousFlights.length === 0 && (
                    <Flex align="center" justify="center" w="100%" h="100%" padding="1rem">
                      <h1>You Have No Tickets for Upcoming Flights</h1>
                    </Flex>
                  )}
                </Card>
              </GridItem>
            </Grid>
          </Flex>
        </>
      )}
    </>
  )
}

export default AgentView

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
