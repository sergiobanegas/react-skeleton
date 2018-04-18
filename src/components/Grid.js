import React from 'react';

import {Grid as GridSemantic} from 'semantic-ui-react';
import styled from 'styled-components';

const Grid = styled(GridSemantic)`
  margin: 0px!important;
`;

export default props => (
    <Grid {...props}/>
);

export const GridColumn = props => (
    <GridSemantic.Column {...props}/>
);