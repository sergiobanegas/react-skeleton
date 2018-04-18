import React from 'react';
import {Message} from 'semantic-ui-react';

export default ({message, errors}) => {
    if (!message && (!errors || errors.length === 0)) {
        return '';
    }
    return errors && errors.length > 0
        ? errors.map((error, index) => <Message key={index} negative>{error}</Message>)
        : <Message negative>{message}</Message>;
}
