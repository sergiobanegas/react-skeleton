import React from 'react';
import {injectIntl} from 'react-intl';
import {Popup} from 'semantic-ui-react';

export default injectIntl(props => (
    <Popup
        {...props}
        content={props.intl.formatMessage({id: props.content})}
    />
));
