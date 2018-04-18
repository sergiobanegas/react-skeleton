import React from 'react';
import {injectIntl} from 'react-intl';
import styled from 'styled-components';

import Text from './Text';

const Title = styled.h1`
  color: ${props => props.color || 'black'}
`;

export default injectIntl(props => (
    <Title><Text {...props}/></Title>
));