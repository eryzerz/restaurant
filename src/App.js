import React, { Component } from 'react'

import Navigation from './Navigation'
import { Provider } from 'react-redux'
import store from './store/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}