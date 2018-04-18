import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {onChangeResetPasswordEmailField, requestResetPassword} from '../../store/modules/auth/resetPassword';
import Grid, {GridColumn} from '../../components/Grid';
import Container from '../../components/Container';
import Form, {FormField, FormGroup, Input} from '../../components/Form';
import Title from '../../components/Title';
import Message from '../../components/Message';
import Button from '../../components/Button';
import ErrorsContainer from '../../components/ErrorsContainer';
import Text from '../../components/Text';
import Icon from '../../components/Icon';
import Divider from '../../components/Divider';

class ResetPasswordContainer extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onClickCancelButton = this.onClickCancelButton.bind(this);
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(onChangeResetPasswordEmailField(value))
    }

    onClickCancelButton() {
        const {history} = this.props;
        history.push('/');
    }

    onSubmit() {
        const {dispatch, email} = this.props;
        dispatch(requestResetPassword(email));
    }

    render() {
        const {successMessage, errorMessage, errors, isRequestFormIncomplete, email} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14}>
                    <Container>
                        <Title id='login'/>
                        {successMessage && <Message info><Icon name='info'/>{successMessage}</Message>}
                        <ErrorsContainer message={errorMessage} errors={errors}/>
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <FormGroup widths='equal'>
                                <FormField width={2}>
                                    <Input
                                        labelid='email'
                                        type='email'
                                        name='email'
                                        placeholderid='email'
                                        value={email}
                                        onChange={this.onChange}
                                    />
                                </FormField>
                            </FormGroup>
                            <Divider/>
                            <Button primary type='submit' disabled={isRequestFormIncomplete}><Text
                                id='send.email'/></Button>
                            <Button onClick={this.onClickCancelButton}><Text id='cancel'/></Button>
                        </Form>
                    </Container>
                </GridColumn>
            </Grid>
        );
    }
}

const mapStateToProps = ({accountReducers}) => {
    const {resetPasswordReducer} = accountReducers;
    return {
        email: resetPasswordReducer.email,
        isRequestFormIncomplete: resetPasswordReducer.isRequestFormIncomplete,
        successMessage: resetPasswordReducer.successMessage,
        errorMessage: resetPasswordReducer.errorMessage,
        errors: resetPasswordReducer.errors
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

ResetPasswordContainer.propTypes = {
    email: PropTypes.string.isRequired,
    isRequestFormIncomplete: PropTypes.bool.isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    errors: PropTypes.array
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPasswordContainer));
