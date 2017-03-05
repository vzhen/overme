import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class ProductCreate extends Component {
  static navigationOptions = {
    // title: 'Products',
    // header: ({ navigate }) => ({
    //   right: (
    //     <Button
    //       title='Add'
    //       onPress={() => navigate('ProductCreate')}
    //     />
    //   ),
    // }),
  }

  render() {
    return (
      <View>
        <Text>Product Create Form</Text>
      </View>
    )
  }
}

export default ProductCreate;