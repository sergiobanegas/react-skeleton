import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {changeTitle} from '../../store/modules/menu/index';
import Title from '../../components/Title';
import Text from '../../components/Text';
import Container from '../../components/Container';
import Grid, {GridColumn} from '../../components/Grid';

class HomeContainer extends Component {

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(changeTitle('home'));
    }

    render() {
        return (
            <div>
                <Grid centered>
                    <GridColumn computer={12} tablet={12} mobile={14}>
                        <Title id='home'/>
                        <Container>
                            <Text id='home.info'/>
                        </Container>
                    </GridColumn>
                </Grid>
            </div>
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
)(HomeContainer));
