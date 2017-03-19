import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Content, List, Text } from 'native-base';
import { connect } from 'react-redux';
import { getNearbyProducts } from '../app/actions';
import ProductListItem from '../tabProduct/ProductListItem';

class Home extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  handleSelect(id) {
    console.log(id);
  }

  handleSelectUser() {
    console.log('navigate to user');
  }

  componentDidMount() {
    this.props.getNearbyProducts([37.79, -122.41], 10);
  }

  render() {
    return (
      <View>
        <Text>My LatLng: {this.props.center}</Text>
        <Text>Show products within: {this.props.radius}km</Text>
        <List
          dataArray={this.props.nearbyProducts}
          renderRow={(data, sectionId, rowId) => 
            <ProductListItem
              onSelect={() => this.handleSelect(rowId)}
              onSelectUser={() => this.handleSelectUser()}
              photoUrl={data.photoUrls.id1}
              name={data.name}
              price={data.price}
              distance={data.distance.toFixed(1)}
              ownerName={data.owner.name}
              ownerPhotoUrl={data.owner.photoUrl}
            />
          }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    center: state.entities.home.center,
    radius: state.entities.home.radius,
    nearbyProducts: state.entities.home.nearbyProducts
  }
}

export default connect(mapStateToProps, { getNearbyProducts })(Home);