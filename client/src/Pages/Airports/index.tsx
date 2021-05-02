import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import {HStack,   Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  InputGroup,
  Input,
  ModalCloseButton,} from '@chakra-ui/react';
import {FiPlusSquare} from 'react-icons/fi';
import GenericList from '../../components/GenericList';
import {useAuth} from '../../hooks/useAuth';

const Airports = () => {
  const [airports, setAirports] = useState<any>();
  const [isEdit, setIsEdit] = useState<any>(false);
  const [increment, setIncrement] = useState(0);
  const [airportName, setAirportName] = useState();
  const [city, setCity] = useState();

  const auth = useAuth();

  useEffect(() => {
    fetch(`https://projectaero-api.herokuapp.com/airports`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        let airportsList: any = [];
        res.map((item: any) => {
          let temp = { 
            left: [
              {
                label: "Airport Name: ",
                value: item.name
              }
            ],
            right: [
              {
                label: "City: ",
                value: item.city
              }
            ]
          }
          airportsList.push(temp);
        })
        setAirports(airportsList)
      })
      .catch(err => console.log(err))

  }, [increment])

  const handleAirportNameChange = (event: any) => {
    setAirportName(event.target.value);
  }

  const handleCityChange = (event: any) => {
    setCity(event.target.value)
  }

  const submitNewAirport = () => {
    fetch(`https://projectaero-api.herokuapp.com/airports`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name: airportName, city: city }),
    }).then(() => {
      setIncrement(increment + 1)
    })
  }
  return (
    <>
      {airports &&
        <Layout>
          <Modal onClose={() => setIsEdit(false)} isOpen={isEdit} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add new Airport</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <InputGroup marginTop = '1rem'>
                  <Input value = {airportName} onChange = {handleAirportNameChange} placeholder = "Airport Name" />
                </InputGroup>
                <InputGroup marginTop = '1rem'>
                  <Input value = {city} onChange = {handleCityChange} placeholder = "City Name" />
                </InputGroup>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    setIsEdit(false)
                    submitNewAirport();
                  }}
                >
                  Submit
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <HStack justify = 'space-between' w = '100%'>
              <HeroText>Airplanes</HeroText>
              {auth.role === 'staff' && <Add onClick = {() => setIsEdit(true)}><PlusIcon className = "PlusIcon"/><p>Add Airplane</p></Add> }
          </HStack>
          <GenericList items = {airports}></GenericList>
        </Layout>
      }
    </>
  )
}

export default Airports;

const HeroText = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`

const Add = styled(HStack)`
:hover {
  cursor: pointer;
  p {
    color: #6137FE;
  }
  .PlusIcon {
    color: #6137FE;
  }
}`;

const PlusIcon = styled(FiPlusSquare)`
width: 20px;
height: 20px;
`;