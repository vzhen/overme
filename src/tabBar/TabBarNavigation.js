import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { TabBar } from './navigationConfiguration'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
 return {
    navigationState: state.navigationState.tabBar,
  }
}
class TabBarNavigation extends Component {
  render() {
    const { dispatch, navigationState } = this.props
    return (
      <TabBar
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
export default connect(mapStateToProps)(TabBarNavigation)