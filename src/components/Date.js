import React from 'react';
import {FormattedDate} from 'react-intl';

export default (props => (
    <FormattedDate {...props}>{capitalizeDate}</FormattedDate>
));

const capitalizeDate = date => {
    return date ? date.charAt(0).toUpperCase() + date.slice(1) : date;
};
