import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorTabHome } from './navigationConfiguration'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
 return {
    navigationState: state.navigationState.tabHome,
  }
}

class TabHomeNavigation extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Home'
    }
  }

  render() {
    const { dispatch, navigationState } = this.props
    return (
      <NavigatorTabHome
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
export default connect(mapStateToProps)(TabHomeNavigation)