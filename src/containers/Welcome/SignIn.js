import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {setSignInFormFieldValue, signIn} from '../../store/modules/auth/session';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Container from '../../components/Container';
import Grid, {GridColumn} from '../../components/Grid';
import Form, {Checkbox, FormField, FormGroup, Input} from '../../components/Form';

const FormContainer = styled(Form)`
  margin-bottom: -15px!important;
`;

class SignInContainer extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit() {
        const {dispatch, formData} = this.props;
        let loginCredentials = {
            email: formData.email,
            password: formData.password,
            remember: formData.remember
        };
        dispatch(signIn(loginCredentials));
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(setSignInFormFieldValue(field, value));
    }

    render() {
        const {incompleteForm, formData} = this.props;
        return (
            <Grid centered>
                <GridColumn textAlign='center'>
                    <Container>
                        <FormContainer onSubmit={this.onSubmit}>
                            <FormGroup widths='equal'>
                                <FormField width={2}>
                                    <Input
                                        icon='at'
                                        type='email'
                                        name='email'
                                        placeholderid='email'
                                        value={formData.email}
                                        onChange={this.onChange}
                                    />
                                </FormField>
                                <FormField width={2}>
                                    <Input
                                        icon='lock'
                                        type='password'
                                        name='password'
                                        placeholderid='password'
                                        value={formData.password}
                                        onChange={this.onChange}
                                    />
                                </FormField>
                                <FormField width={1}>
                                    <Checkbox value={formData.remember} name='remember' labelid='remember.me'
                                              onChange={this.onChange}/>
                                </FormField>
                                <FormField width={1}>
                                    <Button primary type='submit' disabled={incompleteForm}><Text id='login'/></Button>
                                </FormField>
                                <FormField width={1}>
                                    <Text id='not.remember.password' values={{
                                        icon: <Icon name='help'/>,
                                        link: <Link to='/reset-password'><Text id='here'/></Link>
                                    }}/>
                                </FormField>
                            </FormGroup>
                        </FormContainer>
                    </Container>
                </GridColumn>
            </Grid>
        )
    }
}

const mapStateToProps = ({authReducers}) => {
    const {sessionReducer} = authReducers;
    return {
        formData: sessionReducer.formData,
        incompleteForm: sessionReducer.incompleteForm
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

SignInContainer.propTypes = {
    formData: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        remember: PropTypes.bool
    }),
    incompleteForm: PropTypes.bool.isRequired
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SignInContainer));
