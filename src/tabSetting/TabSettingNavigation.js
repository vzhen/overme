import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorTabSetting } from './navigationConfiguration'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
 return {
    navigationState: state.navigationState.tabSetting,
  }
}

class TabSettingNavigation extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Setting'
    }
  }

  render() {
    const { dispatch, navigationState } = this.props
    return (
      <NavigatorTabSetting
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
export default connect(mapStateToProps)(TabSettingNavigation)