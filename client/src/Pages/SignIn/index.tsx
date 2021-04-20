import React, {useState} from 'react'
import {Flex, Input, Button, InputGroup, Center, Checkbox, HStack} from '@chakra-ui/react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const history = useHistory();

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: any) => {
        setPassword(event.target.value);
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
                    <h1 style = {{fontSize: '2rem'}}>Sign in to Aero</h1>
                </Center>
                <FormWrapper
                minW = '450px'
                maxW = '700px'
                direction = 'column'
                padding = '1rem'
                align = 'center'
                >
                    <InputGroup marginTop = '1rem' flexDirection = 'column'>
                        <Input value = {email} onChange = {handleEmailChange} placeholder = 'Email' />
                    </InputGroup>
                    <InputGroup marginTop = '1rem' flexDirection = 'column'>
                        <Input type = 'password' value = {password} onChange = {handlePasswordChange} ontype = 'password' placeholder = 'Password' />
                    </InputGroup>
                    <Flex align = 'center' direction = 'row' w = '100%' marginTop = '2rem' justify = 'space-between'>
                        <Checkbox>Keep Me Signed In</Checkbox>
                        <Button 
                            bg="#6137FE"  
                            color="white"
                            borderRadius= '10px'
                            padding='10px 15px 10px 15px'
                            marginLeft = '1rem'
                            isDisabled = {!(email && password)}
                        >
                        Sign In 
                        </Button>
                    </Flex>

                </FormWrapper>
                <HStack marginTop='1rem' opacity = '.6'>
                    <Link>Forgot My Password?</Link>
                    <p> - </p>
                    <Link onClick = {() => history.push('/signup')}>Don't have an account?</Link>
                </HStack>
                

            </SignInFlex>

    )
}

export default SignIn;

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