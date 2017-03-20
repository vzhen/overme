import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from './FirebaseInit';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import reducers from './reducers';
import TabBarNavigation from '../tabBar/TabBarNavigation';
// import AppNavigation from './AppNavigation';

class App extends Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <TabBarNavigation />
      </Provider> 
    )
  }
}

export default App;