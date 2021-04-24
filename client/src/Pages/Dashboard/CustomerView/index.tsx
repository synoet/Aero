import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { FiExternalLink } from 'react-icons/fi';
import {Flex, Divider, Grid, GridItem, HStack, Button} from '@chakra-ui/react';
import styled from 'styled-components';
import { useAuth } from '../../../hooks/useAuth';

const data = [
    {
      name: 'Oct',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Nov',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Dec',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Jan',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Feb',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Mar',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Apr',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const tempUpcoming = [
    {
        departure_airport_name: 'Lax',
        arrival_airport_name: 'Reagan',
        flightId: '607db6bff3f16d29f58a99b1'
    },
    {
        departure_airport_name: 'Newark',
        arrival_airport_name: 'Berlin',
        flightId: '607db6bff3f16d29f58a99b1'
    },
    {
        departure_airport_name: 'Moscow',
        arrival_airport_name: 'Paris',
        flightId: '607db6bff3f16d29f58a99b1'
    }
]

const tempPrevious = [
    {
        departure_airport_name: 'Lax',
        arrival_airport_name: 'Reagan',
        flightId: '607db6bff3f16d29f58a99b1'
    },
    {
        departure_airport_name: 'Newark',
        arrival_airport_name: 'Berlin',
        flightId: '607db6bff3f16d29f58a99b1'
    },
    {
        departure_airport_name: 'Moscow',
        arrival_airport_name: 'Paris',
        flightId: '607db6bff3f16d29f58a99b1'
    }
]

const CustomerView = () => {
    const auth = useAuth();
    return (
        <>
        <HeroText>Hello 👋 <Highlight>{auth.user.name}</Highlight></HeroText>
                    <SmallText>Welcome to your Customer Dashboard.</SmallText>
                    <Divider marginTop='1rem' marginBottom='1rem' />
                    <Flex
                        direction = 'column'
                        align='center'
                    >
                        <Grid
                            minH="600px"
                            w= '100%'
                            templateRows="repeat(2, 1fr)"
                            templateColumns="repeat(6, 1fr)"
                            gap={4}
                        >
                            <GridItem colSpan={3}>
                                <Card direction = 'column' w = '100%' h = '100%'>
                                    <HStack justify = 'space-between'>
                                        <h1>Upcoming Flights</h1>
                                        <HStack>
                                            <FiExternalLink />
                                            <p> Expand</p>
                                        </HStack>
                                    </HStack>
                                    <Divider marginTop='1rem' marginBottom = '1rem' />
                                    {tempUpcoming.map((flight: any) => {
                                        return (
                                            <UpcomingFlight w = '100%' align = 'center' justify = 'space-between' direction = 'row' padding = '1rem'marginTop ='1rem'>
                                                <HStack>
                                                    <p style = {{fontSize: '1.2rem'}}>{flight.departure_airport_name}</p>
                                                    <FiArrowRight />
                                                    <p style = {{fontSize: '1.2rem'}}>{flight.arrival_airport_name}</p>
                                                </HStack>
                                                <HStack>
                                                    <Button align = 'center' border="1px solid #6137FE"  color="black" background = 'transparent' opacity = '.6'>
                                                        View Details
                                                    </Button>
                                                </HStack>   

                                            </UpcomingFlight>
                                        )
                                    })}

                                </Card>
                            </GridItem>
                            <GridItem colSpan={3}>
                                <Card direction = 'column' w = '100%' h = '100%'>
                                    <HStack justify = 'space-between'>
                                        <h1>Spending History</h1>
                                        <HStack>
                                            <FiExternalLink />
                                            <p> Expand</p>
                                        </HStack>
                                        
                                    </HStack>
                                    
                                    <Divider marginTop='1rem' marginBottom = '1rem' />
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                        width={500}
                                        height={400}
                                        data={data}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                        >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#6137FE" />
                                        </AreaChart>
                                    </ResponsiveContainer>

                                </Card>
                            </GridItem>
                            <GridItem colSpan={6}>
                                <Card direction = 'column' w = '100%' h = '100%'>
                                    <HStack justify = 'space-between'>
                                        <h1>Previous Flights</h1>                                
                                    </HStack>
                                    <Divider marginTop='1rem' marginBottom = '1rem' />
                                    {tempUpcoming.map((flight: any) => {
                                        return (
                                            <UpcomingFlight w = '100%' align = 'center' justify = 'space-between' direction = 'row' padding = '1rem'marginTop ='1rem'>
                                                <HStack>
                                                    <p style = {{fontSize: '1.2rem'}}>{flight.departure_airport_name}</p>
                                                    <FiArrowRight />
                                                    <p style = {{fontSize: '1.2rem'}}>{flight.arrival_airport_name}</p>
                                                </HStack>
                                                <HStack>
                                                    <Button align = 'center' border="1px solid #6137FE"  color="black" background = 'transparent' opacity = '.6'>
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
    )
}

export default CustomerView;

const HeroText = styled.h1`
font-size: 2rem;
font-weight: 600;
`;

const SmallText = styled.p`
opacity: .6;

`;
const Highlight = styled.span`
color: #6137FE;
`;

const Card = styled(Flex)`
border: 1.5px solid #E9E9E9;
box-sizing: border-box;
border-radius: 10px;
padding: 1rem;

h1 {
    font-size: 1.2rem;
    font-weight: 500;
}
`
;

const UpcomingFlight = styled(Flex)`
border: 1.5px solid #E9E9E9;
box-sizing: border-box;
border-radius: 10px;

h1 {
    span {
        opacity: .6;
    }
}
`