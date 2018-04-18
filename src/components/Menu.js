import React from 'react';
import {Menu} from 'semantic-ui-react';

export default props => (
    <Menu {...props}/>
);

export const MenuItem = props => (
    <Menu.Item {...props}/>
);

export const MenuGroup = props => (
    <Menu.Menu {...props}/>
);
