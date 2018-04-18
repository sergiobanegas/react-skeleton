import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import {ACCOUNT_URI, ADMIN_PANEL_URI} from '../App/routes';
import {isAdmin} from '../../utils/user-info';
import {logout} from '../../store/modules/auth/session';
import Menu, {MenuItem, MenuGroup} from '../../components/Menu';
import Dropdown, {DropdownMenu, DropdownItem} from '../../components/Dropdown';
import Text from '../../components/Text';

class MenuContainer extends Component {

    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.onClickAccountOption = this.onClickAccountOption.bind(this);
        this.onClickHomeOption = this.onClickHomeOption.bind(this);
        this.onClickAdminPanelOption = this.onClickAdminPanelOption.bind(this);
    }

    logout() {
        const {dispatch} = this.props;
        dispatch(logout());
    }

    onClickAccountOption() {
        const {history} = this.props;
        history.push(ACCOUNT_URI);
    }

    onClickHomeOption() {
        const {history} = this.props;
        history.push('/');
    }

    onClickAdminPanelOption() {
        const {history} = this.props;
        history.push(ADMIN_PANEL_URI);
    }

    render() {
        const {title} = this.props;
        return (
            <Menu inverted color='blue'>
                <MenuItem active>
                    <Text id={title}/>
                </MenuItem>
                <MenuGroup position='right'>
                    <Dropdown item icon='bars'>
                        <DropdownMenu>
                            <DropdownItem onClick={this.onClickHomeOption}><Text id='home'/></DropdownItem>
                            <DropdownItem onClick={this.onClickAccountOption}><Text id='account'/></DropdownItem>
                            {isAdmin() && <DropdownItem onClick={this.onClickAdminPanelOption}><Text id='admin.panel'/></DropdownItem>}
                            <DropdownItem onClick={this.logout}><Text id='logout'/></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </MenuGroup>
            </Menu>
        );
    }

}

const mapStateToProps = ({menuReducer}) => {
    return {
        title: menuReducer.title
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

MenuContainer.propTypes = {
    title: PropTypes.string.isRequired
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuContainer));
