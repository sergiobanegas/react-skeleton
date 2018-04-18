import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {ADMIN_USERS_URI} from './routes';
import {cleanFilters, getUsers, setEmailValue} from '../../store/modules/administration/adminUsers';
import {changeActivePage} from '../../store/modules/administration/adminMenu';
import Button from '../../components/Button';
import InfiniteScroll from '../../components/InfiniteScroll';
import {Input} from '../../components/Form';
import Form from '../../components/Form';
import Container from '../../components/Container';
import Loader from '../../components/Loader';
import Icon from '../../components/Icon';
import Text from '../../components/Text';
import Message from '../../components/Message';
import Item, {ItemContent, ItemGroup, ItemHeader, ItemImage, ItemSubHeader} from '../../components/Item';
import ScrollToTopButton from '../../components/ScrollToTopButton';

class UsersContainer extends Component {

    constructor() {
        super();
        this.onClickOpenUserDetails = this.onClickOpenUserDetails.bind(this);
        this.loadMoreUsers = this.loadMoreUsers.bind(this);
        this.onChangeEmailInput = this.onChangeEmailInput.bind(this);
        this.onSubmitSearch = this.onSubmitSearch.bind(this);
        this.onClickCleanFilters = this.onClickCleanFilters.bind(this);
    }

    componentWillMount() {
        const {dispatch, pageToLoad, size, email} = this.props;
        dispatch(changeActivePage('users'));
        dispatch(getUsers(pageToLoad, size, email));
    }

    onClickOpenUserDetails(userId) {
        const {history} = this.props;
        history.push(`${ADMIN_USERS_URI}/${userId}`);
    }

    loadMoreUsers() {
        const {dispatch, size, email, users, page} = this.props;
        users.length > 0 && dispatch(getUsers(page + 1, size, email));
    }

    onChangeEmailInput(field, value) {
        const {dispatch} = this.props;
        dispatch(setEmailValue(value));
    }

    onSubmitSearch() {
        const {dispatch, page, size, email} = this.props;
        dispatch(getUsers(page, size, email));
    }

    onClickCleanFilters() {
        const {dispatch} = this.props;
        dispatch(cleanFilters());
    }

    render() {
        const {isLast, users, filtered, email, loading} = this.props;
        const searchIcon = filtered
            ? <Icon name='delete' link onClick={this.onClickCleanFilters}/>
            : <Icon name='search' link onClick={this.onSubmitSearch}/>;
        return (
            <InfiniteScroll
                page={-1}
                loadMore={this.loadMoreUsers}
                last={isLast}
                loader={<Loader active inline='centered' key={0}/>}
            >
                <Container>
                    <Text id='users.search'/>
                    <Form onSubmit={this.onSubmitSearch}>
                        <Input value={email} onChange={this.onChangeEmailInput} icon={searchIcon}
                               placeholderid='filter.by.email'/>
                    </Form>
                </Container>
                {users.length === 0 && !loading ?
                    <Message info>
                        <p><Icon name='info'/>{filtered ? <Text id='no.users.with.data.provided'/> :
                            <Text id='no.users'/>}</p>
                    </Message>
                    :
                    <div>
                        {filtered && <p><Text id='result.users.filtered' values={{email: email}}/></p>}
                        <ItemGroup divided>
                            {
                                users.map(user => (
                                    <Item key={user.id}>
                                        <ItemImage avatar size='tiny' src={user.avatar} alt='avatar'/>
                                        <ItemContent floated='right'>
                                            <ItemHeader as='a' onClick={() => this.onClickOpenUserDetails(user.id)}>
                                                {user.name}
                                            </ItemHeader>
                                            <ItemSubHeader>
                                                <span>{user.email}</span>
                                            </ItemSubHeader>
                                            <Button icon labelPosition='left' floated='right' primary
                                                    onClick={() => this.onClickOpenUserDetails(user.id)}>
                                                <Icon name='info'/>
                                                <Text id='view.details'/>
                                            </Button>
                                        </ItemContent>
                                    </Item>
                                ))
                            }
                        </ItemGroup>
                        <ScrollToTopButton/>
                    </div>
                }
            </InfiniteScroll>
        );
    }
}

const mapStateToProps = ({adminReducers}) => {
    const {adminUsersReducer} = adminReducers;
    return {
        users: adminUsersReducer.users,
        page: adminUsersReducer.page,
        size: adminUsersReducer.size,
        numberOfPages: adminUsersReducer.numberOfPages,
        isLast: adminUsersReducer.isLast,
        email: adminUsersReducer.email,
        filtered: adminUsersReducer.filtered,
        loading: adminUsersReducer.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
};

UsersContainer.propTypes = {
    users: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    numberOfPages: PropTypes.number.isRequired,
    isLast: PropTypes.bool.isRequired,
    email: PropTypes.string.isRequired,
    filtered: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersContainer));
