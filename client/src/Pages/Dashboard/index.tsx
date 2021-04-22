import React from 'react';
import Layout from '../../components/Layout';
import {Flex, Divider} from '@chakra-ui/react';
import styled from 'styled-components';
import {useAuth} from '../../hooks/useAuth';

const Dashboard = () => {
    const auth = useAuth();
    return (
        <Layout>
            <HeroText>Hello 👋 <Highlight>{auth.user.name}</Highlight></HeroText>
            <SmallText>Welcome to your Customer Dashboard.</SmallText>
            <Divider marginTop='1rem' marginBottom='1rem' />

        </Layout>
    )
}

export default Dashboard;

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