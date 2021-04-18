import React, {useState} from 'react'
import {Flex, Input, Button, InputGroup, Center, Checkbox, HStack, Select} from '@chakra-ui/react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const history = useHistory();

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleFistNameChange = (event: any) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event: any) => {
        setLastName(event.target.value);
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
                    <HStack>
                        <InputGroup>
                            <Input placeholder = 'First Name' />
                        </InputGroup>
                        <InputGroup>
                            <Input placeholder = 'Last Name' />
                        </InputGroup>

                    </HStack>
                    <InputGroup marginTop = '1rem' flexDirection = 'column'>
                        <Input value = {email} onChange = {handleEmailChange} placeholder = 'Email' />
                    </InputGroup>
                    <InputGroup marginTop = '1rem' flexDirection = 'column'>
                        <Input type = 'password' value = {password} onChange = {handlePasswordChange} ontype = 'password' placeholder = 'Password' />
                    </InputGroup>
                    <InputGroup marginTop = '1rem'>
                        <Select placeholder="Who are you?">
                            <option value="Customer">Customer</option>
                            <option value="Booking Agent">Booking Agent</option>
                            <option value="Airline Staff">Airline Staff</option>
                        </Select>
                    </InputGroup>
                    <Flex align = 'center' direction = 'row' w = '100%' marginTop = '2rem' justify = 'space-between'>
                        <Button 
                            bg="#6137FE"  
                            color="white"
                            borderRadius= '10px'
                            padding='10px 15px 10px 15px'
                            w = '100%'
                        >
                        Create My Account
                        </Button>
                    </Flex>

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