import React, { useState, useEffect } from 'react'
import Layout from '../../../components/Layout'
import { chakra, Flex, HStack, VStack, Center, Button, Divider } from '@chakra-ui/react'
import styled from 'styled-components'
import { FiArrowRight, FiArrowLeft, FiStar } from 'react-icons/fi'
import smallcircle from '../../../images/smallcircle.svg'
import dots from '../../../images/dots.svg'
import { useScreenType } from '../../../hooks/useScreenType'
import { useHistory } from 'react-router-dom'
import Transaction from '../../Transaction'
import { IFlight, mockFlight } from '../../../utils/types'
import { useAuth } from '../../../hooks/useAuth'

const Flight: React.FC<any> = ({ match }: { match: any }) => {
  const {
    params: { flightId },
  } = match
  const [isLoading, setIsLoading] = useState(true)
  const [flight, setFlight] = useState<IFlight>(mockFlight)
  const [returns, setReturns] = useState([])
  const [listings, setListings] = useState([])
  const [ratings, setRatings] = useState([])
  const auth = useAuth()

  const screenType = useScreenType()

  const history = useHistory()

  useEffect(() => {
    fetch(`https://projectaero-api.herokuapp.com/flights/${flightId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setFlight(res)
      })
      .catch(err => console.log(err))
      .then(() => setIsLoading(false))

    fetch(`https://projectaero-api.herokuapp.com/flights/${flightId}/returns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setReturns(res)
      })
      .catch(err => console.log(err))

    fetch(`https://projectaero-api.herokuapp.com/flights/${flightId}/listings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setListings(res)
        console.log(res)
      })
      .catch(err => console.log(err))

    fetch(`https://projectaero-api.herokuapp.com/flights/${flightId}/ratings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setRatings(res)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      {!isLoading && (
        <Layout>
          <HStack
            marginBottom="1rem"
            _hover={{ cursor: 'pointer', opacity: '.5' }}
            onClick={() => {
              history.push('/flights')
            }}
          >
            <FiArrowLeft />
            <p> Back to Flights</p>
          </HStack>
          <FlightInfo justify="space-between">
            <VStack align="flex-start">
              <SubText>One Way</SubText>
              <HStack>
                <MainText>{flight.departure_airport_name} </MainText>
                <ArrowIcon size={25} />
                <MainText>{flight.arrival_airport_name}</MainText>
              </HStack>
            </VStack>
            <VStack align="flex-end">
              <SubText>Price</SubText>
              <MainText>${flight.base_price}</MainText>
            </VStack>
          </FlightInfo>
          <SelectedFlight direction="column" w="100%" padding="1rem">
            <h1>Departing Flight - {new Date(flight.departure_date).toLocaleTimeString('en-us')}</h1>
            <Flex justify="space-between" direction={screenType === 's' || screenType === 'xs' ? 'column' : 'row'}>
              <FlightTimeInfo>
                <HStack>
                  <Center w="20px" h="35px">
                    <chakra.img src={smallcircle}></chakra.img>
                  </Center>
                  <MediumText>
                    {new Date(flight.departure_date).getHours() < 10 ? '0' : ''}
                    {new Date(flight.departure_date).getHours()}:
                    {new Date(flight.departure_date).getMinutes() < 10 ? '0' : ''}
                    {new Date(flight.departure_date).getMinutes()} - {flight.departure_airport_name}
                  </MediumText>
                </HStack>
                <HStack>
                  <Center w="20px" h="35px">
                    <chakra.img src={dots}></chakra.img>
                  </Center>
                  <SmallLightText>
                    Travel Time: {new Date(flight.arrival_date).getHours() - new Date(flight.departure_date).getHours()}
                    :00 Hours
                  </SmallLightText>
                </HStack>
                <HStack>
                  <Center w="20px" h="35px">
                    <chakra.img src={smallcircle}></chakra.img>
                  </Center>
                  <MediumText>
                    {new Date(flight.arrival_date).getHours() < 10 ? '0' : ''}
                    {new Date(flight.arrival_date).getHours()}:
                    {new Date(flight.arrival_date).getMinutes() < 10 ? '0' : ''}
                    {new Date(flight.arrival_date).getMinutes()} - {flight.arrival_airport_name}
                  </MediumText>
                </HStack>
              </FlightTimeInfo>
              <SelectedFlightInfo>
                <VStack
                  align={screenType === 's' || screenType === 'xs' ? 'flex-start' : 'flex-end'}
                  marginLeft={screenType === 's' || screenType === 'xs' ? '1rem' : '0'}
                  marginTop={screenType === 's' || screenType === 'xs' ? '1rem' : '0'}
                >
                  <MediumText>
                    <span>Airline: </span> {flight.airline_name}
                  </MediumText>
                  <MediumText>
                    <span>Status: </span> {flight.status}
                  </MediumText>
                  <MediumText>
                    <span>Flight Id: </span> {flight._id}
                  </MediumText>
                </VStack>
              </SelectedFlightInfo>
            </Flex>
          </SelectedFlight>

          <Divider marginTop="1rem" />

          <Flex w="100%" marginTop="1rem" marginBottom="2rem">
            <h1 style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>Booking Options</h1>
          </Flex>

          {listings && (
            <BookingOptions marginTop="1rem" direction="column" w="100%">
              {listings.map((listing: any) => {
                return (
                  <Option
                    marginTop="1rem"
                    align="center"
                    w="100%"
                    justify="space-between"
                    direction="row"
                    padding="1rem"
                  >
                    <h1>
                      <span>{listing.seller_type === 'agent' ? 'Booking Agent: ' : 'Airline: '}</span> {listing.seller}
                    </h1>
                    <HStack align="center">
                      <h1 style={{ marginRight: '1rem' }}>{listing.price}$</h1>
                      <Button
                        bg="#6137FE"
                        color="white"
                        onClick={() => {
                          localStorage.setItem(
                            'transaction',
                            JSON.stringify({
                              flight: flight,
                              seller: listing.seller,
                              price: listing.price,
                            })
                          )
                          history.push(`/transaction`)
                        }}
                      >
                        Buy
                      </Button>
                    </HStack>
                  </Option>
                )
              })}
            </BookingOptions>
          )}
          <Divider marginTop="1rem" />

          <Flex w="100%" marginTop="1rem" marginBottom="1rem">
            <h1 style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>Returning Flights</h1>
          </Flex>
          {returns && (
            <>
              <Center>
                <p>{returns.length === 0 ? 'No Flights' : ''}</p>
              </Center>
              <ReturningFlights direction="column" w="100%">
                {returns.map((flight: any) => {
                  const departureDate = new Date(flight.departure_date)
                  const arrivalDate = new Date(flight.arrival_date)
                  return (
                    <ReturnFlight
                      marginTop="1rem"
                      align="center"
                      w="100%"
                      justify="space-between"
                      direction="row"
                      padding="1rem"
                    >
                      <HStack align="center">
                        <p>{flight.departure_airport_name} </p>
                        <ArrowIcon size={15} />
                        <p>{flight.arrival_airport_name}</p>
                      </HStack>
                      <p>{`${arrivalDate.getHours() < 10 ? '0' : ''}${arrivalDate.getHours()}:${
                        arrivalDate.getMinutes() < 10 ? '0' : ''
                      }${arrivalDate.getMinutes()}`}</p>
                      <p>{`${departureDate.getHours() < 10 ? '0' : ''}${departureDate.getHours()}:${
                        departureDate.getMinutes() < 10 ? '0' : ''
                      }${departureDate.getMinutes()}`}</p>
                      <Button
                        bg="#6137FE"
                        color="white"
                        onClick={() => {
                          history.push(`/flight/${flightId}`)
                        }}
                      >
                        View Flight
                      </Button>
                    </ReturnFlight>
                  )
                })}
              </ReturningFlights>
              <Divider marginTop="1rem" />

              <Flex w="100%" marginTop="1rem">
                <h1 style={{ fontWeight: 'bolder', fontSize: '1.2rem' }}>Ratings</h1>
              </Flex>
              {auth.role === 'staff' && auth.user.airline_name === flight.airline_name && (
                <BookingOptions direction="column" w="100%">
                  {Object.keys(ratings).length === 0 && (
                    <Center>
                      <p>No Ratings</p>
                    </Center>
                  )}
                  {ratings.map((rating: any) => {
                    return (
                      <Option
                        marginTop="1rem"
                        align="center"
                        w="100%"
                        justify="space-between"
                        direction="row"
                        padding="1rem"
                      >
                        <h1>Customer Email: {rating.customer_email}</h1>
                        <p>Commentary: {rating.commentary}</p>
                        <HStack>
                          <p>Ratings: {rating.ratings}</p>
                          <FiStar />
                        </HStack>
                      </Option>
                    )
                  })}
                </BookingOptions>
              )}
            </>
          )}
        </Layout>
      )}
    </>
  )
}

export default Flight

const MainText = styled.p`
  font-size: 2rem;
  font-weight: 500;
`

const SubText = styled.p`
  font-size: 1.3rem;
  color: #aaaaaa;
`

const SmallLightText = styled.p`
  font-size: 1rem;
  color: #aaaaaa;
`

const MediumText = styled.p`
  font-size: 1.2rem;

  span {
    opacity: 0.6;
  }
`

const FlightInfo = styled(HStack)``

const ArrowIcon = styled(FiArrowRight)``

const FlightTimeInfo = styled.div`
  margin-top: 1rem;
  margin-left: 1rem;
`

const SelectedFlightInfo = styled.div``

const SelectedFlight = styled(Flex)`
  margin-top: 1rem;
  border: 1.5px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 10px;

  h1 {
    font-size: 1.2rem;
    font-weight: 500;
  }
`

const BookingOptions = styled(Flex)`
  margin-top: 1rem;

  h1 {
    font-size: 1.2rem;
    font-weight: 500;
  }
`

const ReturningFlights = styled(Flex)``

const Option = styled(Flex)`
  border: 1.5px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 10px;

  h1 {
    span {
      opacity: 0.6;
    }
  }
`
const ReturnFlight = styled(Flex)`
  border: 1.5px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 10px;
`
