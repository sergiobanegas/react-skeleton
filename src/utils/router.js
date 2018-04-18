import React from 'react';
import {Route as ReactRoute} from 'react-router-dom';

export const Route = props => (
    <ReactRoute {...props} path={`${props.match.url + props.path}`}/>
);
