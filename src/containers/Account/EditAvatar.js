import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {ACCOUNT_URI} from '../App/routes';
import {
    closeEditAvatarModal, editAvatar, onChangeAvatar,
    openEditAvatarModal
} from '../../store/modules/account/editAvatar';
import Button from '../../components/Button';
import Modal, {ModalActions, ModalContent, ModalDescription, ModalHeader} from '../../components/Modal';
import Image from '../../components/Image';
import Header, {HeaderContent} from '../../components/Header';
import Text from '../../components/Text';
import InputFile from '../../components/InputFile';
import Grid, {GridColumn} from '../../components/Grid';

const ImageContainer = styled.div`
    position: relative;
`;

const ImageEditButton = styled(Button)`
    position: absolute;
    top:0px;
    right:0px;
`;

class EditAvatarContainer extends Component {

    constructor() {
        super();
        this.onEditAvatar = this.onEditAvatar.bind(this);
        this.onClickOpenModalButton = this.onClickOpenModalButton.bind(this);
        this.onClickCancelButton = this.onClickCancelButton.bind(this);
        this.onChangeAvatar = this.onChangeAvatar.bind(this);
        this.generateImageUrl = this.generateImageUrl.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        nextProps.edited && nextProps.history.push(ACCOUNT_URI);
    }

    onEditAvatar() {
        const {dispatch, newAvatar} = this.props;
        dispatch(editAvatar(newAvatar));
    }

    onClickOpenModalButton() {
        const {dispatch} = this.props;
        dispatch(openEditAvatarModal());
    }

    onClickCancelButton() {
        const {dispatch} = this.props;
        dispatch(closeEditAvatarModal());
    }

    onChangeAvatar(event) {
        const {dispatch} = this.props;
        let fileList = event.target.files;
        dispatch(onChangeAvatar(fileList[0]));
    }

    generateImageUrl() {
        const {newAvatar} = this.props;
        let urlCreator = window.URL || window.webkitURL;
        return urlCreator.createObjectURL(newAvatar);
    }

    render() {
        const {info, newAvatar, isEditAvatarModalOpened} = this.props;
        return (
            <div>
                <Header size='huge' textAlign='center'>
                    <HeaderContent>
                        <ImageContainer>
                            <Image src={info.avatar} size='small' alt='avatar' avatar/>
                            <ImageEditButton icon='edit' size='medium' onClick={this.onClickOpenModalButton} circular
                                             primary/>
                        </ImageContainer>
                        <Modal open={isEditAvatarModalOpened} onClose={this.onClickCancelButton}>
                            <ModalHeader><Text id='select.a.photo'/></ModalHeader>
                            <ModalContent image>
                                <ModalDescription>
                                    <Grid centered>
                                        <GridColumn computer={7} tablet={7} mobile={14}>
                                            <p><Text id='change.avatar.instructions'/></p>
                                            <InputFile accept='image/png,image/jpeg' onChange={this.onChangeAvatar}
                                                       text='upload.image'/>
                                        </GridColumn>
                                        <GridColumn computer={7} tablet={7} mobile={14}>
                                            {newAvatar &&
                                            <Image src={this.generateImageUrl()} size='small' alt='avatar'/>}
                                            <p>{newAvatar &&
                                            <Text id='photo.confirmation' values={{fileName: newAvatar.name}}/>}</p>
                                        </GridColumn>
                                    </Grid>
                                </ModalDescription>
                            </ModalContent>
                            <ModalActions>
                                <Button primary onClick={this.onEditAvatar} disabled={!newAvatar}><Text
                                    id='confirm'/></Button>
                                <Button onClick={this.onClickCancelButton}><Text
                                    id='cancel'/></Button>
                            </ModalActions>
                        </Modal>
                    </HeaderContent>
                </Header>
            </div>
        );
    }
}

const mapStateToProps = ({accountReducers}) => {
    const {editAvatarReducer, accountInfoReducer} = accountReducers;
    return {
        info: accountInfoReducer.info,
        isEditAvatarModalOpened: editAvatarReducer.isEditAvatarModalOpened,
        edited: editAvatarReducer.edited,
        newAvatar: editAvatarReducer.newAvatar
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

EditAvatarContainer.propTypes = {
    info: PropTypes.shape({
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
        updatedAt: PropTypes.number.isRequired
    }),
    isEditAvatarModalOpened: PropTypes.bool.isRequired,
    edited: PropTypes.bool.isRequired,
    newAvatar: PropTypes.object
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(EditAvatarContainer));
