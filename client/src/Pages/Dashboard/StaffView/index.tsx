import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import LineGraph from '../../../components/LineGraph'
import { Flex, Divider, Grid, GridItem, HStack, Button } from '@chakra-ui/react'
import * as userService from '../../../services/user.service'


type StaffViewProps = {
  userId: string
}

const StaffView = ({userId}: StaffViewProps) => {
    const [data, setData] = useState<any>()

  useEffect(() => {
    userService.loadStaffData(userId).then((res: any) => {
      setData(res)
      console.log(res)
    })
  },[])
  return <h1>Staff Dashboard </h1>
}

export default StaffView
