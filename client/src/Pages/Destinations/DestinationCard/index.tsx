import React from 'react'
import { Box, Image, Badge } from '@chakra-ui/react'
import styled from 'styled-components'

const DestinationCard = ({ Destination }: any) => {
  return (
    <StyledBox maxW="sm" borderRadius="lg" overflow="hidden">
      <Image h="200px" w="100%" src={Destination.image} />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="red">
            Hot
          </Badge>
          <Box color="gray" fontWeight="semibold" letterSpacing="wide" fontSize="xs" textTransform="uppercase" ml="2">
            {Destination.airport}
          </Box>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {Destination.location}
        </Box>
      </Box>
    </StyledBox>
  )
}

export default DestinationCard

const StyledBox = styled(Box)`
  box-shadow: -12.0195px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px -12.0195px 12.0195px rgba(0, 0, 0, 0.03),
    12.0482px 0px 12.0195px rgba(0, 0, 0, 0.03), 0px 12.0195px 12.0195px rgba(0, 0, 0, 0.03);
  border-radius: 20.0487px;
  background: #ffffff;
`
