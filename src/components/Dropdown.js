import React from 'react';
import {injectIntl} from 'react-intl';
import {Dropdown} from 'semantic-ui-react';

export default injectIntl(props => (
    <Dropdown {...props} text={props.text && props.intl.formatMessage({id: props.text})}/>
));

export const DropdownMenu = props => (
    <Dropdown.Menu {...props}/>
);

export const DropdownItem = props => (
    <Dropdown.Item {...props}/>
);
