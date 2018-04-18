import React from 'react';
import Label from './Label';
import Icon from './Icon';
import styled from 'styled-components';
import Text from './Text';

const FileInput = styled.input`
    display: none;
`;

export default ({accept, onChange, text}) => (
    <div>
        <label htmlFor='imageUpload'>
            <Label as='a' color='blue' size='large'>
                <Icon name='file image outline'/> <Text id={text}/>
            </Label>
        </label>
        <FileInput type='file' id='imageUpload'
               accept={accept} onChange={onChange}/>
    </div>
);