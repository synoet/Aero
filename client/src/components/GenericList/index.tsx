import React from 'react'
import styled from 'styled-components'
import { Flex, HStack } from '@chakra-ui/react'

type GenericListProps = {
  items: {
    left: { label: string; value: string }[]
    right: { label: string; value: string }[]
  }[]
}
const GenericList = ({ items }: GenericListProps) => {
  return (
    <Flex w="100%" direction="column" justify="center" align="center">
      {items.map((item: any) => {
        return (
          <ListItem marginTop="1rem" w="100%" padding="1rem" justify="space-between">
            <HStack>
              {item.left.map((leftItem: any) => {
                return (
                  <h1>
                    <span>{leftItem.label}</span>
                    {leftItem.value}
                  </h1>
                )
              })}
            </HStack>
            <HStack>
              {item.right.map((rightItem: any) => {
                return (
                  <h1>
                    <span>{rightItem.label}</span>
                    {rightItem.value}
                  </h1>
                )
              })}
            </HStack>
          </ListItem>
        )
      })}
    </Flex>
  )
}

export default GenericList

const ListItem = styled(Flex)`
  border: 1.5px solid #e9e9e9;
  box-sizing: border-box;
  border-radius: 10px;

  h1 {
    span {
      opacity: 0.6;
    }
  }
`
