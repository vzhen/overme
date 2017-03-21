import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Content, List, Text } from 'native-base';
import { connect } from 'react-redux';
import { getProductsByUserId } from '../app/actions';
import ProductListItem from './ProductListItem';

const styles = {
  content: {
    backgroundColor: '#FFFFFF'
  }
}

class ProductList extends Component {
  static navigationOptions = {
    title: 'Products',
    header: ({ navigate }) => ({
      right: (
        <Button
          title='Add'
          onPress={() => navigate('ProductCreate')}
        />
      ),
    }),
  }

  constructor() {
    super();
    this.state = {
      userPosition: [31, -171] // Default lat lng
    }
  }

  handleGetCurrentPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({
        userPosition: [latitude, longitude]
      })
    })
  }

  handleSelectProduct(productId) {
    this.props.navigation.navigate('Product', { productId });
  }

  handleSelectUser() {
    console.log('navigate to user product page');
  }

  componentDidMount() {
    this.handleGetCurrentPosition();

    // TODO: use dynamic user id.
    this.props.getProductsByUserId('sms|5797235fe618d33da2eb0ad3');
  }

  render() {
    const { products } = this.props;
    // TODO: user dynamic user id.
    const uid = 'sms|5797235fe618d33da2eb0ad3';
    return (
      <Content style={styles.content}>
        <List
          dataArray={products[uid]}
          renderRow={(data, sectionId, rowId) => 
            <ProductListItem
              name={data.name}
              price={data.price}
              photoUrl={data.photoUrl}
              ownerName={data.owner.name}
              ownerPhotoUrl={data.owner.photoUrl}
              location1={this.state.userPosition}
              location2={data.location}
              onSelectProduct={() => this.handleSelectProduct(rowId)}
              onSelectUser={() => this.handleSelectUser()}
            />
        } />
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return { products: state.entities.product.list }
}

export default connect(mapStateToProps, { getProductsByUserId })(ProductList);