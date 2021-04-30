import React from 'react'

import { Text, Link } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

const NavItem = (props: any) => {
  const history = useHistory()
  const { children, isLast, active, to = '/', ...rest } = props
  console.log(active)
  return (
    <Text mb={{ base: isLast ? 0 : 8, sm: 0 }} mr={{ base: 0, sm: isLast ? 0 : 8 }} display="block" {...rest}>
      <Link _hover={{ color: '#6137FE' }} color={active ? '#6137FE' : 'black'} onClick={() => history.push(to)}>
        {children}
      </Link>
    </Text>
  )
}

export default NavItem
