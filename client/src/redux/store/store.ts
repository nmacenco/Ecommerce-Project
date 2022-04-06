import {applyMiddleware,createStore} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers/index';
import {composeWithDevTools} from 'redux-devtools-extension'

const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;