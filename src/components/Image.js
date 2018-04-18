import React from 'react';
import {Image as SemanticImage} from 'semantic-ui-react';
import {injectIntl} from 'react-intl';

export default injectIntl(props => (
    <SemanticImage
        {...props}
        alt={props.intl.formatMessage({id: props.alt})}
    />
));
