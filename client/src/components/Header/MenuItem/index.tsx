import React from 'react';

import {Text, Link} from '@chakra-ui/react';

const MenuItem = (props: any) => {
    const { children, isLast, to = "/", ...rest } = props;
    return (
        <Text
          mb={{ base: isLast ? 0 : 8, sm: 0 }}
          mr={{ base: 0, sm: isLast ? 0 : 8 }}
          display="block"
          {...rest}
        >
          <Link to={to}>{children}</Link>
        </Text>
      )
}

export default MenuItem;