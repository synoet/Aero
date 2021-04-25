import React from 'react';
import Layout from '../../components/Layout';
import {useAuth} from '../../hooks/useAuth';
import CustomerView from './CustomerView';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const auth = useAuth();
    const history = useHistory();
    return (
        <Layout>
            {auth.user &&
                <>
                    {auth.role === 'customer' &&
                        <CustomerView />
                    }
                </>
            }
        </Layout>
    )
}

export default Dashboard;

