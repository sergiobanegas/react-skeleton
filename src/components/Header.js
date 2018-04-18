import React from 'react';
import {Header as SemanticHeader} from 'semantic-ui-react';

export default props => (
    <SemanticHeader {...props}/>
);


export const HeaderContent = props => (
    <SemanticHeader.Content {...props}/>
);