import React, { Component } from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { NavigatorTabProduct } from './navigationConfiguration'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
 return {
    navigationState: state.navigationState.tabProduct,
  }
}

class TabProductNavigation extends Component {
  static navigationOptions = {
    tabBar: {
      label: 'Product'
    }
  }

  render() {
    const { dispatch, navigationState } = this.props
    return (
      <NavigatorTabProduct
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
export default connect(mapStateToProps)(TabProductNavigation)