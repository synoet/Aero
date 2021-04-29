import React from 'react'
import styled from 'styled-components'
import { Flex, VStack, HStack, chakra, Button, Divider } from '@chakra-ui/react'
import flight from '../../../images/flight.svg'
import { useScreenType } from '../../../hooks/useScreenType'
import { useHistory } from 'react-router-dom'

interface FlightCardProps {
  departureTime: string
  departureLocation: string
  arrivalTime: string
  arrivalLocation: string
  price: number
  airline: string
  flightId: string
}
const FlightCard: React.FC<FlightCardProps> = ({
  departureTime,
  departureLocation,
  arrivalTime,
  arrivalLocation,
  price,
  airline,
  flightId,
}) => {
  const screenType = useScreenType()
  const history = useHistory()

  return (
    <FlightFlex
      direction={screenType === 's' || screenType === 'xs' ? 'column' : 'row'}
      minH="130px"
      w="100%"
      align="center"
      justify="space-between"
      padding="1.5rem 2.5rem 1.5rem 2rem"
      _hover={screenType === 's' || screenType === 'xs' ? { border: '1px solid #6137FE', cursor: 'pointer' } : {}}
      onClick={
        screenType === 's' || screenType === 'xs'
          ? () => {
              history.push(`/flight/${flightId}`)
            }
          : () => {}
      }
    >
      <HStack>
        <Departure spacing={0}>
          <MainText>{departureTime}</MainText>
          <SubText>{departureLocation}</SubText>
        </Departure>
        <Image src={flight} w={screenType === 's' || screenType === 'xs' ? '160px' : '200px'}></Image>
        <Arrival spacing={0}>
          <MainText>{arrivalTime}</MainText>
          <SubText>{arrivalLocation}</SubText>
        </Arrival>
      </HStack>
      <Price spacing={0} d={screenType === 's' || screenType === 'xs' ? 'none' : 'block'}>
        <MainText>
          ${price}
          <span>/person</span>
        </MainText>
      </Price>
      <Options d={screenType === 's' || screenType === 'xs' ? 'none' : 'block'}>
        <Button
          bg="#6137FE"
          color="white"
          onClick={() => {
            history.push(`/flight/${flightId}`)
          }}
        >
          View Info
        </Button>
      </Options>
    </FlightFlex>
  )
}

export default FlightCard

const FlightFlex = styled(Flex)`
  box-shadow: -12.0195px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px -12.0195px 12.0195px rgba(0, 0, 0, 0.03),
    12.0482px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px 12.0195px 12.0195px rgba(0, 0, 0, 0.03);
  border-radius: 20.0487px;
  background: #ffffff;
`

const MainText = styled.p`
  font-size: 1.6rem;
  font-weight: 500;

  span {
    font-size: 1rem;
    margin-left: 10px;
    color: #aaaaaa;
  }
`

const SubText = styled.p`
  font-size: 1rem;
  color: #aaaaaa;
`

const Image = styled(chakra.img)``
const Departure = styled(VStack)`
  width: 150px;
`
const Arrival = styled(VStack)`
  width: 150px;
`
const Price = styled(VStack)``
const Options = styled(VStack)``
