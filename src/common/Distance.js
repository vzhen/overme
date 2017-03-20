import React, { Component } from 'react';
import { View, Text } from 'react-native';
import GeoFire from 'geofire';

class Distance extends Component {
  constructor() {
    super()
    this.state = {
      distance: 0
    }
  }

  componentDidMount() {
    const location1 = this.props.location1;
    const location2 = this.props.location2;
    this.setState({
      distance: GeoFire.distance(location1, location2)
    })
  }

  render() {
    return (
      <View>
        <Text>{this.state.distance.toFixed(1)}km</Text>
      </View>
    )
  }
}

Distance.defaultProps = {
  location1: [37.32, -122.41],
  location2: [37.32, -122.41]
};

Distance.propTypes = {
  location1: React.PropTypes.array,
  location2: React.PropTypes.array
}

export default Distance;