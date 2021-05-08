import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../hooks/useAuth'
import CustomerView from './CustomerView'
import AgentView from './AgentView'
import StaffView from './StaffView'
import { useHistory, Redirect } from 'react-router-dom'

const Dashboard = () => {
  const auth = useAuth()
  const history = useHistory()

  return (
    <Layout>
      {auth.user && (
        <>
          {auth.role === 'customer' && <CustomerView userId={auth.user._id} />}
          {auth.role === 'staff' && <StaffView userId={auth.user._id} />}
          {auth.role === 'agent' && <AgentView userId={auth.user._id} />}
        </>
      )}
      {!auth.user &&
            <Redirect to = "/home" />
      }
    </Layout>
  )
}

export default Dashboard
