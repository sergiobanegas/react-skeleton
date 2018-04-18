import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default props => (
    <Box {...props}/>
);
