import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'
import { AppNavigator } from './navigationConfiguration'

const mapStateToProps = (state) => {
 return {
    navigationState: state.navigationState.app,
  }
}
class AppNavigation extends Component {
  render() {
    const { dispatch, navigationState } = this.props
    return (
      <AppNavigator
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(AppNavigation)