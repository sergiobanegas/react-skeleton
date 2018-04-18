import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {REDIRECT_TIMEOUT} from '../../config';
import {WELCOME_URI} from '../App/routes';
import {confirmAccount} from '../../store/modules/account/confirmAccount';
import Grid, {GridColumn} from '../../components/Grid';
import Container from '../../components/Container';
import Message from '../../components/Message';
import Text from '../../components/Text';

class ConfirmAccountContainer extends Component {

    componentWillMount() {
        const {dispatch, match} = this.props;
        dispatch(confirmAccount(match.params.token));
    }

    componentDidMount() {
        const {history} = this.props;
        setTimeout(() => {
            history.push(WELCOME_URI);
        }, REDIRECT_TIMEOUT);
    }

    render() {
        const {confirmed, successMessage, errorMessage} = this.props;
        return (
            <Grid centered>
                <GridColumn computer={8} tablet={12} mobile={14} textAlign='center'>
                    <Container>
                        {confirmed ? <Message success>{successMessage}</Message> :
                            <Message error>{errorMessage}</Message>}
                        <div><Text id='redirecting'/></div>
                    </Container>
                </GridColumn>
            </Grid>
        );
    }
}

const mapStateToProps = ({accountReducers}) => {
    const {confirmAccountReducer} = accountReducers;
    return {
        confirmed: confirmAccountReducer.confirmed,
        successMessage: confirmAccountReducer.successMessage,
        errorMessage: confirmAccountReducer.errorMessage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

ConfirmAccountContainer.propTypes = {
    confirmed: PropTypes.bool.isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmAccountContainer));
