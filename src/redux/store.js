import {createStore,combineReducers,applyMiddleware} from 'redux';
import promise from 'redux-promise-middleware';

import volunteerReducer from './reducers/volunteerReducer'
import organizationReducer from './reducers/organizationReducer';
import eventReducer from './reducers/eventReducer';
import userReducer from './reducers/userReducer'

const rootReducer = combineReducers({
    volunteer:volunteerReducer,
    organization:organizationReducer,
    events:eventReducer,
    userReducer: userReducer
});

export default createStore(
    rootReducer,
    applyMiddleware(promise)
    );


