import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {changeActivePage} from '../../store/modules/administration/adminMenu';
import Text from '../../components/Text';

class MainPageContainer extends Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(changeActivePage('home'));
    }

    render() {
        return (
            <Text id='admin.panel.info'/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

export default withRouter(connect(
    mapDispatchToProps
)(MainPageContainer));
