import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import GenericList from '../../components/GenericList';

const Airplanes = () => {
  const [airplanes, setAirplanes] = useState<any>();
  useEffect(() => {
    fetch(`https://projectaero-api.herokuapp.com/airplanes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        let airplanesList: any = [];
        res.map((item: any) => {
          let temp = { 
            left: [
              {
                label: "Airplane Name: ",
                value: item.airline_name
              },
              {
                label: "Airplane Id: ",
                value: item._id
              }
            ],
            right: [
              {
                label: "Seats: ",
                value: item.seats
              }
            ]
          }
          airplanesList.push(temp);
        })
        console.log(res)
        setAirplanes(airplanesList)
      })
      .catch(err => console.log(err))

  }, [])
  return (
    <>
      {airplanes &&
        <Layout>
          <HeroText>Airplanes</HeroText>
          <GenericList items = {airplanes}></GenericList>
        </Layout>
      }
    </>
  )
}
export default Airplanes;

const HeroText = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`