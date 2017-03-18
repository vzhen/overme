import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
// import { geoQuery } from '../app/actions';

class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  handleGetLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    })
  }

  componentDidMount() {
    // this.props.geoQuery([37.79, -122.41], 10);
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

export default connect(null, {  })(Home);