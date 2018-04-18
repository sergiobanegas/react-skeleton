import React from 'react';
import {injectIntl} from 'react-intl';
import {Confirm} from 'semantic-ui-react';

export default injectIntl(props => (
    <Confirm
        {...props}
        content={props.intl.formatMessage({id: props.content})}
        cancelButton={props.intl.formatMessage({id: props.cancelButton})}
        confirmButton={props.intl.formatMessage({id: props.confirmButton})}
    />
));
