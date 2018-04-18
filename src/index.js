import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import 'semantic-ui-css/semantic.min.css';

import {registerLocales} from './i18n/utils';
import store from './store';
import IntlProvider from './i18n/IntlProvider';
import App from './containers/App';

registerLocales();

let history = createBrowserHistory();

ReactDOM.render(
    <Provider store={store(history)}>
        <IntlProvider>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </IntlProvider>
    </Provider>,
    document.getElementById('root')
);
