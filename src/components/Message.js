import React from 'react';
import {Message} from 'semantic-ui-react';

export default props => (
    <Message {...props}/>
);

export const MessageHeader = props => (
    <Message.Header {...props}/>
);