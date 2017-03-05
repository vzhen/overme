import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  handleGetLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    })
  }

  render() {
    return (
      <View>
        <Text>Load products around me</Text>
        <Button onPress={() => this.handleGetLocation()} title='Get Location' />
      </View>
    )
  }
}

export default Home;