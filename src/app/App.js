import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import reducers from './reducers';
import { FIREBASE_CONFIG } from '../constants/configs';
// import TabBarNavigation from '../tabBar/TabBarNavigation';
import AppNavigation from './AppNavigation';

class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    firebase.initializeApp(FIREBASE_CONFIG);
  }
  
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, ReduxLogger()));
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider> 
    )
  }
}

export default App;