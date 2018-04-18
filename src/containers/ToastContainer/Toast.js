import React from 'react';

import Icon from '../../components/Icon';

export default ({icon, message}) => (
    <span><Icon name={icon}/>{message}</span>
);
