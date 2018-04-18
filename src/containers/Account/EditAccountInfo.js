import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {ACCOUNT_URI} from '../App/routes';
import {
    editAccountInfo, setEditAccountFormFieldValue,
    setInitialAccountInfo
} from '../../store/modules/account/editAccountInfo';
import Button from '../../components/Button';
import {FormField, FormGroup, Input, Select} from '../../components/Form';
import Form from '../../components/Form';
import ErrorsContainer from '../../components/ErrorsContainer';
import EditAvatar from './EditAvatar';
import Text from '../../components/Text';
import Divider from '../../components/Divider';

const GENDER_OPTIONS = [
    {key: 'male', value: 'MALE', icon: 'man'},
    {key: 'female', value: 'FEMALE', icon: 'woman'}
];

const LANGUAGE_OPTIONS = [
    {key: 'english', value: 'EN', flag: 'gb'},
    {key: 'spanish', value: 'ES', flag: 'es'},
    {key: 'japanese', value: 'JA', flag: 'jp'},
    {key: 'french', value: 'FR', flag: 'fr'}

];

class EditAccountInfoContainer extends Component {

    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClickExitEditCredentialsButton = this.onClickExitEditCredentialsButton.bind(this);
    }

    componentWillMount() {
        const {dispatch, info, language, history} = this.props;
        info.email !== ''
            ? dispatch(setInitialAccountInfo({...info, language: language}))
            : history.push(ACCOUNT_URI);
    }

    onSubmit() {
        const {dispatch, formData} = this.props;
        dispatch(editAccountInfo(formData));
    }

    onChange(field, value) {
        const {dispatch} = this.props;
        dispatch(setEditAccountFormFieldValue(field, value));
    }

    onClickExitEditCredentialsButton() {
        const {history} = this.props;
        history.push(ACCOUNT_URI);
    }

    render() {
        const {formData, errorMessage, errors, isIncompleteForm, loading} = this.props;
        return (
            <div>
                <EditAvatar/>
                {errorMessage && <ErrorsContainer errors={errors}/>}
                <Form onSubmit={this.onSubmit} loading={loading}>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                labelid='email'
                                icon='at'
                                type='email'
                                name='email'
                                value={formData.email}
                                placeholderid='email'
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths='equal'>
                        <FormField width={6}>
                            <Input
                                labelid='name'
                                icon='info'
                                type='text'
                                name='name'
                                value={formData.name}
                                placeholderid='name'
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <FormGroup widths='equal'>
                        <FormField>
                            <b><Text id='gender'/></b>
                            <Select
                                type='select'
                                name='gender'
                                value={formData.gender}
                                placeholderid='gender'
                                options={GENDER_OPTIONS}
                                onChange={this.onChange}
                            />
                        </FormField>
                        <FormField>
                            <b><Text id='language'/></b>
                            <Select
                                type='select'
                                name='language'
                                value={formData.language}
                                placeholderid='language'
                                options={LANGUAGE_OPTIONS}
                                onChange={this.onChange}
                            />
                        </FormField>
                    </FormGroup>
                    <Divider/>
                    <Button primary type='submit' disabled={isIncompleteForm}><Text id='confirm'/></Button>
                    <Button type='submit' onClick={this.onClickExitEditCredentialsButton}><Text id='cancel'/></Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({accountReducers}) => {
    const {accountInfoReducer, editAccountInfoReducer} = accountReducers;
    return {
        info: accountInfoReducer.info,
        language: accountInfoReducer.language.toUpperCase(),
        isIncompleteForm: editAccountInfoReducer.isIncompleteForm,
        loading: editAccountInfoReducer.loading,
        formData: editAccountInfoReducer.formData,
        errorMessage: editAccountInfoReducer.errorMessage,
        errors: editAccountInfoReducer.errors
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

EditAccountInfoContainer.propTypes = {
    info: PropTypes.shape({
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
        updatedAt: PropTypes.number.isRequired
    }),
    formData: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        gender: PropTypes.string,
        avatar: PropTypes.string
    }),
    language: PropTypes.string.isRequired,
    isIncompleteForm: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    errors: PropTypes.array,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditAccountInfoContainer);
