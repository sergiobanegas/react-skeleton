import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {ADMIN_USERS_URI} from './routes';
import {ADMIN_PANEL_URI} from '../App/routes';
import Menu, {MenuItem} from '../../components/Menu';
import Icon from '../../components/Icon';
import Text from '../../components/Text';

class AdminMenu extends Component {

    constructor() {
        super();
        this.onClickMainPageButton = this.onClickMainPageButton.bind(this);
        this.onClickUserMenuOption = this.onClickUserMenuOption.bind(this);
    }

    onClickMainPageButton() {
        const {history} = this.props;
        history.push(ADMIN_PANEL_URI);
    }

    onClickUserMenuOption() {
        const {history} = this.props;
        history.push(ADMIN_USERS_URI);
    }

    render() {
        const {title} = this.props;
        return (
            <Menu icon='labeled'>
                <MenuItem active={title === 'home'} onClick={this.onClickMainPageButton}>
                    <Icon name='home'/>
                    <Text id='main.page'/>
                </MenuItem>
                <MenuItem active={title === 'users'} onClick={this.onClickUserMenuOption}>
                    <Icon name='user'/>
                    <Text id='users'/>
                </MenuItem>
            </Menu>
        );
    }
}

const mapStateToProps = ({adminReducers}) => {
    const {adminMenuReducer} = adminReducers;
    return {
        title: adminMenuReducer.active
    }
};

AdminMenu.propTypes = {
    title: PropTypes.string.isRequired
};

export default withRouter(connect(
    mapStateToProps
)(AdminMenu));
