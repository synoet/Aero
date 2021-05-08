import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import GenericList from '../../components/GenericList'
import { FiPlusSquare } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'
import { Redirect } from 'react-router-dom'
import {
  HStack,
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
const Airplanes = () => {
  const [airplanes, setAirplanes] = useState<any>()
  const [isEdit, setIsEdit] = useState<any>(false)
  const [increment, setIncrement] = useState(0)
  const [airportName, setAirportName] = useState()
  const [seats, setSeats] = useState()

  const auth = useAuth()

  useEffect(() => {
    fetch(`https://projectaero-api.herokuapp.com/airplanes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        let airplanesList: any = []
        res.map((item: any) => {
          let temp = {
            left: [
              {
                label: 'Airline Name: ',
                value: item.airline_name,
              },
              {
                label: 'Airplane Id: ',
                value: item._id,
              },
            ],
            right: [
              {
                label: 'Seats: ',
                value: item.seats,
              },
            ],
          }
          airplanesList.push(temp)
        })
        console.log(res)
        setAirplanes(airplanesList)
      })
      .catch(err => console.log(err))
  }, [increment])

  const handleSeatsChange = (event: any) => {
    setSeats(event.target.value)
  }

  const submitNewAirport = () => {
    fetch(`https://projectaero-api.herokuapp.com/airplanes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ airline_name: auth.user.airline_name, seats: seats }),
    }).then(() => {
      setIncrement(increment + 1)
    })
  }

  return (
    <>
      {auth.user && (
        <>
          {airplanes && (
            <Layout>
              <Modal onClose={() => setIsEdit(false)} isOpen={isEdit} isCentered>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Add new Airplane</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <InputGroup marginTop="1rem">
                      <Input isDisabled={true} placeholder={auth.user.airline_name} />
                    </InputGroup>
                    <InputGroup marginTop="1rem">
                      <Input value={seats} onChange={handleSeatsChange} placeholder="Seats" />
                    </InputGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      onClick={() => {
                        setIsEdit(false)
                        submitNewAirport()
                      }}
                    >
                      Submit
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <HStack justify="space-between" w="100%">
                <HeroText>Airplanes</HeroText>
                {auth.role === 'staff' && (
                  <Add onClick={() => setIsEdit(true)}>
                    <PlusIcon className="PlusIcon" />
                    <p>Add Airplane</p>
                  </Add>
                )}
              </HStack>
              <GenericList items={airplanes}></GenericList>
            </Layout>
          )}
        </>
      )}
      {(!auth.user || auth.role != 'staff') && <Redirect to="/home" />}
    </>
  )
}
export default Airplanes

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
