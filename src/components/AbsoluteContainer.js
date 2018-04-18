import React from 'react';
import {Portal} from 'semantic-ui-react';

export default props => (
    <Portal open={props.open !== false} {...props}/>
);
