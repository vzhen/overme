import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { checkIfUserLoggedIn } from '../app/actions';

const isLoggedIn = false;

class SplashScreen extends Component {
  componentDidMount() {
    this.props.checkIfUserLoggedIn();
    const { auth } = this.props;
    if (!_.isEmpty(auth)) {
      if (auth.displayName) {
        // this.props.navigation.navigate('TabBarNavigation');
        this._navigateTo('TabBarNavigation');
      } else {
        console.log('go setup profile');
        // Actions.profileCreate({ type: 'reset' });
      }
    }
  }

  componentWillUpdate(nextProps) {
    const { auth } = nextProps;
    if (!_.isEmpty(auth)) {
      if (auth.displayName) {
        // this.props.navigation.navigate('TabBarNavigation');
        this._navigateTo('TabBarNavigation');
      } else {
        console.log('go setup profile');
      }
    }
  }

  _navigateTo = (routeName) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <View>
        <Text>Splash Screen</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.entities.auth };
} 

export default connect(mapStateToProps, { checkIfUserLoggedIn })(SplashScreen);