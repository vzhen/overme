import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Thumbnail, Content, H1, H2, H3, Left, Right, Card, CardItem, Grid, Col, Row } from 'native-base';
import ImageList from '../common/ImageList';

const mockData = { 
  id1: {
    name: 'Apple iPhone 5 grey 16GB',
    price: '2499',
    description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
    photoUrls: {
      id1: 'https://goo.gl/Um6zzq',
      id2: 'https://goo.gl/VpZphW',
      id3: 'https://goo.gl/4YdX3t'
    },
    owner: {
      name: 'Chok Wee Ching',
      photoUrl: 'https://goo.gl/o2GAOT'
    }
  },
  id2: {
    name: 'Xiaomi Redmi note 4', 
    price: '800',
    photoUrls : {
      id1: 'https://goo.gl/EcxG0S',
      id2: 'https://goo.gl/GHVWjg',
      id3: 'https://goo.gl/QiwM7i',
      id4: 'https://goo.gl/zdUkbH'
    }, 
    owner: {
      name: 'Chok Wee Ching',
      photoUrl: 'https://goo.gl/o2GAOT'
    }
  },
  id3: { 
    name: 'Mi Box',
    price: '300',
    photoUrls: {
      id1: 'https://goo.gl/jYwx8i'
    },
    owner: {
      name: 'Chok Wee Ching',
      photoUrl: 'https://goo.gl/o2GAOT'
    }
  }
}

const styles = {
  content: {
    backgroundColor: '#FFFFFF'
  },

  ownerWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom : 10,
    borderBottomWidth: 1,
    borderColor: '#F1F1F1'
  },

  titleWrap: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom : 10
  },

  detailWrap: { 
    paddingLeft: 15,
    paddingRight: 15,
  },

  title: { flex: 3 },
  price: { flex: 1, alignItems: 'flex-end' }
}

class Product extends Component {
  render() {
    const { state } = this.props.navigation;
    const productId = state.params.id;
    return (
      <Content style={styles.content}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <ScrollView horizontal>
            <ImageList images={mockData[productId].photoUrls} />
          </ScrollView>

          <View style={styles.ownerWrap}>
            <Thumbnail small source={{ uri: mockData[productId].owner.photoUrl }} />
            <Text style={{ paddingLeft: 10 }}>{mockData[productId].owner.name}</Text>
          </View>

          <View style={styles.detailWrap}>
            <View style={styles.titleWrap}>
              <View style={styles.title}><H3>{mockData[productId].name}</H3></View>
              <View style={styles.price}><Text style={{ fontSize: 16 }}>RM {mockData[productId].price}</Text></View>
            </View>
            <Text>{mockData[productId].description}</Text>
          </View> 
        </View>
      </Content>
    )
  }
}

export default Product;