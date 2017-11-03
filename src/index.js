import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const initialState = {
    scores: {
        Panthers: 0,
        Falcons: 0
    },
    curTeam: "Panthers",
    playByPlay: [],
    curYardage: "",
    curDrive: 1

};

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

ReactDOM.render(
<Provider store = {store}>
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
