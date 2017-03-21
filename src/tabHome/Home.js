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

  handleSelectProduct(id) {
    console.log(id);
  }

  handleSelectUser() {
    console.log('navigate to user');
  }

  componentDidMount() {
    this.props.getNearbyProducts(10);
  }

  render() {
    return (
      <View>
        <List
          dataArray={this.props.nearbyProducts}
          renderRow={(data, sectionId, rowId) => 
            <ProductListItem
              onSelectProduct={() => this.handleSelectProduct(rowId)}
              onSelectUser={() => this.handleSelectUser()}
              photoUrl={data.photoUrls.id1}
              name={data.name}
              price={data.price}
              location1={this.props.center}
              location2={data.location}
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
    userPosition: state.entities.home.userPosition,
    nearbyProducts: state.entities.home.nearbyProducts
  }
}

export default connect(mapStateToProps, { getNearbyProducts })(Home);