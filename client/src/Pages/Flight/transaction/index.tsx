import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Flex, HStack, InputGroup, Input, Select, Button, SliderFilledTrack, Image } from '@chakra-ui/react'
import {useAuth} from '../../../hooks/useAuth';
import {useHistory} from 'react-router-dom';
import Success from '../../../images/success.svg';
const Transaction = () => {
  const [data, setData] = useState<any>()
  const [cardType, setCardType] = useState('Visa')
  const [cardNumber, setCardNumber] = useState()
  const [cardExpiration, setCardExpiration] = useState()
  const [isDone, setIsDone] = useState(false);
  const auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    const transaction = localStorage.getItem('transaction');
    if (transaction){
      console.log(JSON.parse(transaction));
      setData(JSON.parse(transaction));
    }
  
  }, [])

  const handleCardTypeChange = (event: any) => {
    setCardType(event.target.value)
  }

  const handleCardNumberChange = (event: any) => {
    setCardNumber(event.target.value)
  }

  const handleCardExpirationChange = (event: any) => {
    setCardExpiration(event.target.value)
  }

  const handleCheckout = () => {
    fetch(`https://projectaero-api.herokuapp.com/transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userEmail: auth.user.email,
        bookingEmail: data.seller.includes('@') ? data.seller : null,
        price: data.price,
        cardType: cardType,
        cardNumber: cardNumber,
        cardExpiration: cardExpiration,
        flightId: data.flight._id
      })
      }).then((res) => {
        console.log('Success')
        setIsDone(true);
      }).catch(error => console.log(error))
  }

  return (
    <>
    {data && 
    <TransactionFlex w="100%" direction="column" justify="center" align="center" h="100vh">
      <Flex minW="500px" maxW="900px" direction="column">
        {!isDone &&
        <>
        <HStack w="100%" marginBottom="1rem" align="center" justify="center">
          <HeroText>Ticket Checkout</HeroText>
        </HStack>
        <PurchaseItemWrapper direction="column" padding="1rem" align="center" justify="center">
          <HStack w="100%">
            <h1>
              Flight Id: <Highlight>{data.flight._id}</Highlight>
            </h1>
          </HStack>
          <HStack w="100%">
            <h1>
              {' '}
              Seller: <Highlight>{data.seller}</Highlight>
            </h1>
            <h1>
              Price: <Highlight>${data.price}</Highlight>
            </h1>
          </HStack>
        </PurchaseItemWrapper>
        <FormWrapper marginTop="1rem" direction="column" padding="1rem" align="center">
          <InputGroup marginTop="1rem">
            <Select onChange={handleCardTypeChange} placeholder="Visa">
              <option value="American Express">American Express</option>
              <option value="Discover">Discover</option>
              <option value="MasterCard">MasterCard</option>
            </Select>
          </InputGroup>
          <InputGroup marginTop="1rem">
            <Input
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="Card Number (Ex. 4242 4242 4242 4242)"
            />
          </InputGroup>
          <InputGroup marginTop="1rem">
            <Input value={cardExpiration} onChange={handleCardExpirationChange} placeholder="Card Expiration (yyyy-mm)" />
          </InputGroup>
          <Button
            w="100%"
            bg="#6137FE"
            color="white"
            borderRadius="10px"
            padding="10px 15px 10px 15px"
            marginTop="1rem"
            onClick = {() => {
              handleCheckout();
            }}
          >
            Checkout
          </Button>
        </FormWrapper>
        </>
        }
        {isDone &&
        <Flex h = '100%' w = '100%' align = 'center' direction = 'column' justify = 'center'> 
          <Image src = {Success} w = '150px' h = '150px'/>
          <HeroText>Purchase Sucessful!</HeroText>
          <Link onClick = {() => history.push('/home')}>Go Back Home</Link>
        </Flex>
          
        }
      </Flex>
    </TransactionFlex>
    }
    </>
  )
}

export default Transaction

const TransactionFlex = styled(Flex)``

const PurchaseItemWrapper = styled(Flex)`
  background: #ffffff;
  box-shadow: -12.0195px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px -12.0195px 12.0195px rgba(0, 0, 0, 0.03),
    12.0482px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px 12.0195px 12.0195px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
`

const FormWrapper = styled(Flex)`
  background: #ffffff;
  box-shadow: -12.0195px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px -12.0195px 12.0195px rgba(0, 0, 0, 0.03),
    12.0482px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px 12.0195px 12.0195px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
`
const Highlight = styled.span`
  color: #6137fe;
`
const HeroText = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`
const Link = styled.h1`
  color: #6137fe;
  :hover {
    opacity: .6;
    cursor: pointer;
  }

`;