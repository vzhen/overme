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

  handleSelectProduct(productId) {
    this.props.navigation.navigate('Product', { productId });
  }

  handleSelectUser() {
    console.log('navigate to user');
  }

  componentDidMount() {
    this.props.getNearbyProducts(1); // by km
  }

  render() {
    const userLatitude = this.props.userPosition.coords.latitude;
    const userLongitude = this.props.userPosition.coords.longitude;
    return (
      <View>
        <List
          dataArray={this.props.nearbyProducts}
          renderRow={(data, sectionId, rowId) => 
            <ProductListItem
              onSelectProduct={() => this.handleSelectProduct(rowId)}
              onSelectUser={() => this.handleSelectUser()}
              photoURL={data.photoURLs.id1}
              name={data.name}
              price={data.price}
              location1={[userLatitude, userLongitude]}
              location2={data.location}
              ownerName={data.owner.displayName}
              ownerPhotoURL={data.owner.photoURL}
            />
          }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    userPosition: state.entities.home.userPosition,
    nearbyProducts: state.entities.home.nearbyProducts
  }
}

export default connect(mapStateToProps, { getNearbyProducts })(Home);