import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';
import { Card, CardItem, Text, Thumbnail, Body, Left, Right, Button } from 'native-base';

const { width, height } = Dimensions.get('window');
const styles = {
  card: {
    marginLeft: 15, 
    marginRight: 15, 
    marginTop: 15, 
    paddingLeft: 0
  },

  titleWrap: {
    borderBottomWidth: 1,
    borderColor: '#F1F1F1'
  },

  productPhoto: { height: 250, width: width - 30 }, // 30 is card left right margin
  userPhoto: { height: 80, width: 80 },
};

class ProductListItem extends Component {
  handleSelect() {
    this.props.onSelect();
  }

  handleSelectUser() {
    this.props.onSelectUser();
  }

  render() {
    return (
      <Card style={styles.card}>
        
        <CardItem style={{ padding: 0 }} button onPress={() => this.handleSelect()}>
          <Image source={{ uri: this.props.photoUrl }} resizeMode='cover' style={styles.productPhoto} />
        </CardItem>
        
        <CardItem style={styles.titleWrap} button onPress={() => this.handleSelect()}>
          <Text>{this.props.name}</Text>
          <Text>{this.props.distance}km</Text>
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