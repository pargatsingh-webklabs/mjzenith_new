import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Root } from "native-base";
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'; 
import reducers from './Reducers';

import Router from './Router';

export default class App extends React.Component {
  render() {
    return (
	  <Provider store={ createStore(reducers, {}, applyMiddleware(ReduxThunk)) }>
        <Root>
          <Router/>
        </Root>
      </Provider>
    );
  }
}
