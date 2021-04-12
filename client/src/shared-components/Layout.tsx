import React from 'react';
import { Flex } from '@chakra-ui/react';


const Layout = (props: any) => {
    return (
        <Flex
            direction = 'column'
            align = 'center'
            maxW = {{ xl: "1200px"}}
            m = "0 auto"
        >
            {props.children}
        </Flex>

    )
}

export default Layout;