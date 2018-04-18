import React, {Component} from 'react';
import {connect} from 'react-redux';
import {IntlProvider as ReactIntlProvider} from 'react-intl';

class IntlProvider extends Component {

    render() {
        let {locale, messages, children} = this.props;
        return (
            <ReactIntlProvider locale={locale} messages={messages}>{children}</ReactIntlProvider>
        );
    }
}

const mapStateToProps = ({localeReducer}) => {
    return {
        key: localeReducer.key,
        locale: localeReducer.locale,
        messages: localeReducer.messages
    }
};

export default connect(mapStateToProps)(IntlProvider);
