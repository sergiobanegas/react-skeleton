import React from 'react';
import {Item} from 'semantic-ui-react';

export default props => (
    <Item {...props}/>
);

export const ItemGroup = props => (
    <Item.Group {...props}/>
);

export const ItemImage = props => (
    <Item.Image {...props}/>
);

export const ItemHeader = props => (
    <Item.Header {...props}/>
);

export const ItemSubHeader = props => (
    <Item.Meta {...props}/>
);

export const ItemContent = props => (
    <Item.Content {...props}/>
);
