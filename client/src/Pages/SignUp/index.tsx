import React, {useState} from 'react'
import {Flex, Input, Button, InputGroup, Center, Checkbox, HStack, Select} from '@chakra-ui/react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import States from '../../data/states.json';
import Countries from '../../data/states.json';

const SignUp = () => {
    const [isWho, setIsWho] = useState(true);
    const [who, setWho] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const [firstName, setFirstName] = useState(undefined); // Customer
    const [lastName, setLastName] = useState(undefined); // Customer
    const [buildingNumber, setBuildingNumber] = useState(undefined); // Customer
    const [city, setCity] = useState(undefined); // Customer
    const [street, setStreet] = useState(undefined); //Customer
    const [state, setState] = useState(undefined); // Customer
    const [phoneNumber, setPhoneNumber] = useState(undefined); // Customer
    const [passportNumber, setPassportNumber] = useState(undefined); // Customer
    const [passportExpiration, setPassportExpiriation] = useState(undefined); //Customer
    const [passportCountry, setPassportCountry] = useState(undefined); //Customer
    const [dob, setDob] = useState(undefined); //Customer

    const [commision, setCommision] = useState(undefined); //agent

    const [airlineName, setAirlineName] = useState(undefined); // staff

    const history = useHistory();

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    //Agent
    const handleCommisionChange = (event: any) => {
        setCommision(event.target.value);
    }    

    //Staff
    const handleAirlineChange = (event: any) => {
        setAirlineName(event.target.value);
    }


    //Customer
    const handleFistNameChange = (event: any) => {
        setFirstName(event.target.value);
    }   

    //Customer
    const handleLastNameChange = (event: any) => {
        setLastName(event.target.value);
    }

    //Customer
    const handleCityChange = (event: any) => {
        setLastName(event.target.value);
    }

    //Customer
    const handleStreetChange = (event: any) => {
        setStreet(event.target.value);
    }

    //Customer
    const handleBuildingNumberChange = (event: any) => {
        setBuildingNumber(event.target.value);
    }

    //Customer
    const handlePhoneNumberChange = (event: any) => {
        setPhoneNumber(event.target.value);
    }

    //Customer
    const handlePassportNumberChange = (event: any) => {
        setPassportNumber(event.target.value);
    }

    //Customer
    const handlePassportExpirationChange = (event: any) => {
        setPassportExpiriation(event.target.value);
    }

    //Customer
    const handleDobChange = (event: any) => {
        setDob(event.target.value);
    }

    //Customer
    const handleState = (event: any) => {
        setState(event.target.value);
    }

    //Customer
    const handleCountry = (event: any) => {
        setPassportCountry(event.target.value);
    }

    
    const handleWho = (event: any) => {
        setWho(event.target.value);
    }

    const isCompleted = (): boolean => {
        if (who === 'customer'){
            if(email && password && firstName && lastName && buildingNumber && city && state && phoneNumber && passportNumber && passportExpiration && passportCountry && dob){
                return true;
            }
        }else if(who === 'agent'){
            if(email && password && commision){
                return true;
            }
        }else if(who === 'staff'){
            if(email && password && airlineName){
                return true;
            }
        }

        return false
    }


    return (

            <SignInFlex
                w = '100%'
                direction = 'column'
                justify = 'center'
                align = 'center'
                h = '100vh'
            >
      
                        <Center marginBottom = '1rem'>
                            <h1 style = {{fontSize: '2rem'}}>Create your Account</h1>
                        </Center>
                        <FormWrapper
                        minW = '400px'
                        maxW = '700px'
                        direction = 'column'
                        padding = '1rem'
                        align = 'center'
                        >
                        {isWho && 
                            <>
                                <h2>First Answer this question</h2>
                                <InputGroup marginTop = '1rem'>
                                    <Select  onChange = {handleWho} placeholder="How do you intend to use Aero?">
                                        <option value="customer">Customer</option>
                                        <option value="agent">Booking Agent</option>
                                        <option value="staff">Airline Staff</option>
                                    </Select>
                                </InputGroup>
                                <Button 
                                    w = '100%'
                                    bg="#6137FE"  
                                    color="white"
                                    borderRadius= '10px'
                                    padding='10px 15px 10px 15px'
                                    marginTop='1rem'
                                    isDisabled = {who != undefined ? false: true}
                                    onClick = {() => {setIsWho(false)}}
                                >
                                    Next Step
                                </Button>
                            </>
                        
                        }
                        {!isWho && 
                            <>
                                {who === 'customer' && 
                                    <HStack>
                                        <InputGroup>
                                            <Input placeholder = 'First Name' />
                                        </InputGroup>
                                        <InputGroup>
                                            <Input placeholder = 'Last Name' />
                                        </InputGroup>

                                    </HStack>
                                }
                                <InputGroup marginTop = '1rem' flexDirection = 'column'>
                                    <Input value = {email} onChange = {handleEmailChange} placeholder = 'Email' />
                                </InputGroup>
                                <InputGroup marginTop = '1rem' flexDirection = 'column'>
                                    <Input type = 'password' value = {password} onChange = {handlePasswordChange} ontype = 'password' placeholder = 'Password' />
                                </InputGroup>
                                {who === 'agent' && 
                                    <InputGroup marginTop = '1rem' flexDirection = 'column'>
                                        <Input  value = {commision} onChange = {handleCommisionChange}  placeholder = 'Commision' />
                                    </InputGroup>
                                }
                                {who === 'staff' && 
                                    <InputGroup marginTop = '1rem' flexDirection = 'column'>
                                        <Input  value = {airlineName} onChange = {handleAirlineChange}  placeholder = 'Airline Name' />
                                    </InputGroup>
                                }

                                {who === 'customer' && 
                                    <>
                                        <InputGroup marginTop = '1rem' flexDirection = 'column'>
                                            <Input value = {phoneNumber} onChange = {handlePhoneNumberChange} placeholder = 'Phone Number' />
                                        </InputGroup>
                                        <InputGroup marginTop = '1rem' flexDirection = 'column'>
                                            <Input value = {dob} onChange = {handleDobChange} placeholder = 'Date of Birth (dd/mm/yy)' />
                                        </InputGroup>
                                        <InputGroup marginTop = '1rem'>
                                            <Select  onChange = {handleState} placeholder="State">
                                                {States.data.map((state: any) => {
                                                    return (
                                                        <option value={state.abbreviation}>{state.abbreviation}</option>
                                                    )
                                                })}
                                            </Select>
                                        </InputGroup>
                                        <InputGroup marginTop = '1rem' flexDirection = 'column'>
                                            <Input value = {city} onChange = {handleCityChange} placeholder = 'City' />
                                        </InputGroup>
                                        <InputGroup marginTop = '1rem' flexDirection = 'column'>
                                            <Input value = {street} onChange = {handleStreetChange} placeholder = 'Street' />
                                        </InputGroup>
                                        <InputGroup marginTop = '1rem' flexDirection = 'column'>
                                            <Input value = {buildingNumber} onChange = {handleBuildingNumberChange} placeholder = 'Building Number' />
                                        </InputGroup>
                                        <InputGroup marginTop = '1rem' flexDirection = 'column'>
                                            <Input value = {passportNumber} onChange = {handlePassportNumberChange} placeholder = 'Passport Number' />
                                        </InputGroup>
                                        <InputGroup marginTop = '1rem' flexDirection = 'column'>
                                            <Input value = {passportExpiration} onChange = {handlePassportExpirationChange} placeholder = 'Passport Expiration' />
                                        </InputGroup>
                                        <InputGroup marginTop = '1rem'>
                                            <Select  onChange = {handleCountry} placeholder="Passport Country">
                                                {Countries.data.map((country: any) => {
                                                    return (
                                                        <option value={country.abbreviation}>{country.name}</option>
                                                    )
                                                })}
                                            </Select>
                                        </InputGroup>
                                    </>
                                }


                                <Flex align = 'center' direction = 'row' w = '100%' marginTop = '2rem' justify = 'space-between'>
                                    <Button 
                                        border="1px solid #6137FE"  
                                        background = 'transparent'
                                        color="black"
                                        borderRadius= '10px'
                                        padding='10px 15px 10px 15px'
                                        w = '25%'
                                        onClick = {() => setIsWho(true)}
                                    >
                                    Back
                                    </Button>
                                    <Button 
                                        bg="#6137FE"  
                                        color="white"
                                        borderRadius= '10px'
                                        padding='10px 15px 10px 15px'
                                        marginLeft = '.5rem'
                                        w = '75%'
                                        isDisabled = {!isCompleted()}
                                    >
                                    Create My Account
                                    </Button>
                                </Flex>
                             </>
                            }
                        </FormWrapper>
                        
                        <HStack marginTop='1rem' opacity = '.6'>
                            <Link onClick = {() => history.push('/signin')}>Already have an Account? Sign In</Link>
                        </HStack>
                

            </SignInFlex>

    )
}

export default SignUp;

const SignInFlex = styled(Flex)``;

const FormWrapper = styled(Flex)`
background: #FFFFFF;
box-shadow: -12.0195px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px -12.0195px 12.0195px rgba(0, 0, 0, 0.03), 12.0482px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px 12.0195px 12.0195px rgba(0, 0, 0, 0.03);
border-radius: 10px;
`;

const Link = styled.p`
:hover {
    cursor: pointer;
    color: #6137FE;
}
`;