import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {signUp, setSignUpFormFieldValue} from '../../store/modules/auth/signUp';
import Button from '../../components/Button';
import Form, {FormField, FormGroup, Select, Input} from '../../components/Form';
import Title from '../../components/Title';
import ErrorsContainer from '../../components/ErrorsContainer';
import Text from '../../components/Text';
import Message from '../../components/Message';
import Divider from '../../components/Divider';

const GENDER_OPTIONS = [
    {key: 'male', value: 'MALE', icon: 'man'},
    {key: 'female', value: 'FEMALE', icon: 'woman'}
];

class SignUpContainer extends Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(setSignUpFormFieldValue(field, value));
    }

    onSubmit() {
        const {dispatch, formData} = this.props;
        dispatch(signUp(formData));
    }

    render() {
        const {formData, successMessage, errorMessage, errors, incompleteForm, passwordsNotMatching} = this.props;
        return (
            <div>
                <Title id='registration'/>
                <p><Text id='registration.instructions'/></p>
                {passwordsNotMatching
                    ? <ErrorsContainer message={<Text id='passwords.not.matching'/>}/>
                    : <ErrorsContainer errors={errors} message={errorMessage}/>}
                {successMessage && <Message info>{successMessage}</Message>}
                <Form onSubmit={this.onSubmit}>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                icon='at'
                                type='email'
                                name='email'
                                placeholderid='email'
                                value={formData.email}
                                onChange={this.onChange}
                            />
                        </FormField>
                        <FormField width={6}>
                            <Input
                                icon='info'
                                type='text'
                                name='name'
                                placeholderid='name'
                                value={formData.name}
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                icon='lock'
                                type='password'
                                name='password'
                                placeholderid='password'
                                value={formData.password}
                                onChange={this.onChange}
                            />
                        </FormField>
                        <FormField width={6}>
                            <Input
                                icon='lock'
                                type='password'
                                name='passwordConfirmation'
                                placeholderid='password.confirmation'
                                value={formData.passwordConfirmation}
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths={3}>
                        <FormField>
                            <Select
                                type='select'
                                name='gender'
                                placeholderid='gender'
                                options={GENDER_OPTIONS}
                                value={formData.gender}
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <Divider/>
                    <Button primary type='submit' disabled={incompleteForm}><Text id='register'/></Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({authReducers}) => {
    const {signUpReducer} = authReducers;
    return {
        formData: signUpReducer.formData,
        incompleteForm: signUpReducer.incompleteForm,
        successMessage: signUpReducer.successMessage,
        errorMessage: signUpReducer.errorMessage,
        errors: signUpReducer.errors,
        passwordsNotMatching: signUpReducer.passwordsNotMatching
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

SignUpContainer.propTypes = {
    formData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        passwordConfirmation: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired
    }),
    incompleteForm: PropTypes.bool.isRequired,
    passwordsNotMatching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    errors: PropTypes.array,
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpContainer));
