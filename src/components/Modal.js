import React from 'react';
import {Modal as SemanticModal} from 'semantic-ui-react';

export default props => (
    <SemanticModal {...props}/>
);

export const ModalHeader = props => (
    <SemanticModal.Header {...props}/>
);

export const ModalContent = props => (
    <SemanticModal.Content {...props}/>
);

export const ModalDescription = props => (
    <SemanticModal.Description {...props}/>
);

export const ModalActions = props => (
    <SemanticModal.Actions {...props}/>
);
