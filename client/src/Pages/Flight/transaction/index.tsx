import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Flex, HStack, InputGroup, Input, Select, Button} from '@chakra-ui/react';


type TransactionProps = {
  flight: any,
  price: number,
  seller: string,
}


const Transaction = ({flight, price, seller}: TransactionProps) => {
  const [cardType, setCardType] = useState('Visa');
  const [cardNumber, setCardNumber] = useState();
  const [cardExpiration, setCardExpiration] = useState();

  const handleCardTypeChange = (event: any) => {
    setCardType(event.target.value);
  }

  const handleCardNumberChange = (event: any) => { 
    setCardNumber(event.target.value);
  }

  const handleCardExpirationChange = (event: any) => { 
    setCardExpiration(event.target.value);
  }

  return (
    <TransactionFlex
      w = "100%"
      direction = "column"
      justify = "center"
      align = "center"
      h = "100vh"
    >
      <Flex minW = "500px" maxW = "900px" direction = "column">
      <HStack w = '100%' marginBottom = '1rem' align = "center" justify="center">
        <HeroText>Ticket Checkout</HeroText>
      </HStack>
        <PurchaseItemWrapper  direction="column" padding="1rem" align="center" justify = "center">
          <HStack w = "100%">
            <h1>Flight Id: <Highlight>asdasdasd</Highlight></h1>
          </HStack>
          <HStack w = "100%">
            <h1> Seller: <Highlight>agent@agent.com</Highlight></h1>
            <h1>Price: <Highlight>$500</Highlight></h1>
          </HStack>
        </PurchaseItemWrapper>
        <FormWrapper marginTop = '1rem' direction="column" padding="1rem" align="center">
          <InputGroup marginTop = "1rem">
            <Select onChange = {handleCardTypeChange} placeholder = 'Visa'>
              <option value = "American Express">American Express</option> 
              <option value = "Discover">Discover</option>
              <option value = "MasterCard">MasterCard</option>
            </Select>
          </InputGroup>
          <InputGroup marginTop = "1rem">
            <Input value = {cardNumber} onChange = {handleCardNumberChange} placeholder = 'Card Number (Ex. 4242 4242 4242 4242)'/>
          </InputGroup>
          <InputGroup marginTop = "1rem">
            <Input value = {cardExpiration} onChange = {handleCardExpirationChange} placeholder = 'Card Expiration (mm/yy)'/>
          </InputGroup>
          <Button
              w="100%"
              bg="#6137FE"
              color="white"
              borderRadius="10px"
              padding="10px 15px 10px 15px"
              marginTop="1rem"
            >
              Checkout
            </Button>
        </FormWrapper>
      </Flex>
    </TransactionFlex>

  )

}

export default Transaction;

const TransactionFlex = styled(Flex)``;

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