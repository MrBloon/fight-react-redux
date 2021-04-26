// external modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise';

// internal modules
import App from './components/app';
import '../assets/stylesheets/application.scss';

// State and reducers
import specialsReducer from './reducers/specials_reducer';
import selectedSpecialReducer from './reducers/selected_special_reducer';
import playerActionReducer from './reducers/player_action_reducer';
import playerHPReducer from './reducers/player_hp_reducer';
import computerActionReducer from './reducers/computer_action_reducer';
import computerHPReducer from './reducers/computer_hp_reducer';
import resultReducer from './reducers/result_reducer';

const identityReducer = (state = null) => state;

const initialState = {
  actions: ["Melee Attack", "Ranged Attack", "Magic Attack"],
  specials: [
    {
      "name": "Vision",
      "uses": 2
    },
    {
      "name": "Melee Boost",
      "uses": 2,
      "boost": 1
    },
    {
      "name": "Ranged Boost",
      "uses": 2,
      "boost": 1
    },
    {
      "name": "Magic Boost",
      "uses": 2,
      "boost": 1
    }
  ],
  selectedSpecial: null,
  playerAction: null,
  playerHP: 10,
  computerHP: 10,
  computerAction: null,
  result: null
}
const reducers = combineReducers({
  actions: identityReducer,
  specials: specialsReducer,
  selectedSpecial: selectedSpecialReducer,
  playerAction: playerActionReducer,
  playerHP: playerHPReducer,
  computerHP: computerHPReducer,
  computerAction: computerActionReducer,
  result: resultReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(reduxPromise, logger));

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
