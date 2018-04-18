import React from 'react';

import Icon from './Icon';

export default ({gender}) => (
    <Icon name={gender.toUpperCase() === 'FEMALE' ? 'woman' : 'man'}/>
);

