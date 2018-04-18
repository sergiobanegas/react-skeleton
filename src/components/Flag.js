import React from 'react';
import {Flag} from 'semantic-ui-react';

const countryLanguages = {
    'ES': 'es',
    'JA': 'jp',
    'EN': 'gb',
    'FR': 'fr'
};

export default ({name}) => (
    <Flag name={countryLanguages[name]}/>
);
