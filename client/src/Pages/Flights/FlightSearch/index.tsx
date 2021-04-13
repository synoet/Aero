import React,{useState} from 'react'
import {Flex, HStack, VStack, Button, Input, InputGroup, Center, InputLeftElement, InputLeftAddon} from '@chakra-ui/react';
import {FiCalendar, FiSearch, FiHome, FiMapPin, FiMap} from 'react-icons/fi'
import {useScreenType} from '../../../hooks/useScreenType';

import styled from 'styled-components';

const FlightSearch: React.FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const screenType = useScreenType();

    const handleStartDate = () => {

    }

    const handleEndDate = () => {

    }
    return (
        <SearchFlex
            w = '100%'
            direction = 'column'
            minH ='120px'
            padding = '1.5rem'
        >
            <h2>Search for Flights</h2>
            <FormWrapper
                direction = {(screenType === 's' || screenType === 'xs')? 'column': 'row'}
                justify = 'space-between'
                marginBottom='1rem'
            >
                <Location 
                    w = {(screenType === 's' || screenType === 'xs')? '100%': '49%'}
                    marginBottom = {(screenType === 's' || screenType === 'xs')? '1rem': '0'}
                >
                    <InputGroup>
                    <InputLeftAddon
                        pointerEvents = 'none'
                        children = {<FiHome />}
                    />
                    <Input 
                        size = 'md'
                        placeholder = 'From?'
                    />
                    </InputGroup>

                    <InputGroup>
                        <InputLeftAddon
                            pointerEvents='none'
                            children = {<FiMapPin />}
                        />
                        <Input 
                            size = 'md'
                            placeholder = 'Where To?'
                        />
                    </InputGroup>
                </Location>
                <DateWrapper
                    w = {(screenType === 's' || screenType === 'xs')? '100%': '49%'}
                >
                    <InputGroup>
                        <InputLeftAddon
                                pointerEvents = 'none'
                                children = {<FiCalendar />}
                            />
                        <Input 
                            size = 'md'
                            placeholder = 'Start Date? (dd/mm/yy)'
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftAddon
                                pointerEvents = 'none'
                                children = {<FiCalendar />}
                            />
                        <Input 
                            size = 'md'
                            placeholder = 'End Date? (dd/mm/yy)'
                        />
                    </InputGroup>
                </DateWrapper>
            </FormWrapper>
            <Center>
                <Button 
                    bg="#6137FE"  
                    color="white"
                    borderRadius= '50px'
                    padding='10px 15px 10px 15px'
                    position='absolute'
                    bottom='-1rem'
                    
                >
                <FiSearch style = {{marginRight: '10px'}}></FiSearch>
                Search
                </Button>
            </Center>
        </SearchFlex>
    )
}

export default FlightSearch;

const SearchFlex = styled(Flex)`
background: #FFFFFF;
box-shadow: -12.0195px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px -12.0195px 12.0195px rgba(0, 0, 0, 0.03), 12.0482px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px 12.0195px 12.0195px rgba(0, 0, 0, 0.03);
border-radius: 10px;
margin-bottom: 4rem;
position: relative;

h2 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
}
`;

const Location = styled(HStack)``;
const DateWrapper = styled(HStack)``;
const FormWrapper = styled(Flex)``;