import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

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

  render() {
    return (
      <View>
        <Text>My Product List</Text>
      </View>
    )
  }
}

export default ProductList;