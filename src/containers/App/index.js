import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import MenuContainer from '../Menu';
import PropTypes from 'prop-types';

import AppRoutes from './AppRoutes';
import ToastContainer from '../ToastContainer';

class App extends Component {
    render() {
        const {logged} = this.props;
        return (
            <div>
                {logged && <MenuContainer/> }
                <AppRoutes/>
                <ToastContainer/>
            </div>
        );
    }
}

const mapStateToProps = ({authReducers}) => {
    const {sessionReducer} = authReducers;
    return {
        logged: sessionReducer.logged
    }
};

App.propTypes = {
    logged: PropTypes.bool.isRequired
};

export default withRouter(connect(
    mapStateToProps
)(App));
