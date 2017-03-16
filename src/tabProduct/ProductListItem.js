import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';
import { Card, CardItem, Text, Thumbnail, Body, Left, Right, Button } from 'native-base';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  productPhoto: { height: 250, width: width - 30 }, // 30 is card left right margin
  userPhoto: { height: 80, width: 80 }
});

// Temporary remove image due to laggy

class ProductListItem extends Component {
  handleSelect() {
    this.props.onSelect();
  }

  handleSelectUser() {
    this.props.onSelectUser();
  }

  render() {
    return (
      <Card style={{ marginLeft: 15, marginRight: 15, marginTop: 15, paddingLeft: 0 }}>
        
        <CardItem style={{ padding: 0 }} button onPress={() => this.handleSelect()}>
          <Image source={{ uri: this.props.photoUrl }} resizeMode='cover' style={styles.productPhoto} />
        </CardItem>
        
        <CardItem button onPress={() => this.handleSelect()}>
          <Text>{this.props.name}</Text>
        </CardItem>
        
        <CardItem button onPress={() => this.handleSelectUser()}>
          <Left>
              <Thumbnail small source={{ uri: this.props.ownerPhotoUrl }} />
              <Text>{this.props.ownerName}</Text>
          </Left>
          <Right><Text>RM {this.props.price}</Text></Right>
        </CardItem>
        
      </Card>
    )
  }
}

export default ProductListItem;