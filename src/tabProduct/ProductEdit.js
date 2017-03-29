import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import _ from 'lodash';
import MapView from 'react-native-maps';
import { updateProduct } from '../app/actions';
import MultiImagePicker from '../common/MultiImagePicker';
import ImageSwiper from '../common/ImageSwiper';

const { width, height } = Dimensions.get('window');
const styles = {
  mapWrap: {
    position: 'relative',
    height: 200,
    width: width,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerWrap: {
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: 0, 
    right: 0, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'transparent'
  },
  marker: {
    width: 32,
    height: 32
  }
}

class ProductEdit extends Component {
  static navigationOptions = {
    title: 'Editing',
    header: ({ navigate }) => ({
      right: (
        <Button danger transparent>
          <Text>Delete</Text>
        </Button>
      ),
    }),
  }

  constructor(props) {
    super(props)
    const { 
      key,
      name, 
      price, 
      description,
      photoURLs,
      location 
    } = this.props.product;
    
    this.state = {
      key,
      name,
      price,
      description: description || '',
      photoURLs,
      latlng: [location[0], location[1]],
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
  }

  handleUpdate() {
    const { key, name, price, description, latlng, photoURLs } = this.state;
    this.props.updateProduct(key, name, price, photoURLs, latlng, description);
  }

  handleSelect = (uri) => {
    const uuid = uuidV4();
    this.setState({
      photoURLs: { ...this.state.photoURLs, [uuid]: uri }
    })
  }

  handleRemove = (key) => {
    const { photoURLs } = this.state;
    if (this.state.photoURLs[key].startsWith('http')) {
      // TODO:
      console.log('remove directly from firebase');
    } else {
      this.setState({
        photoURLs: _.omit(photoURLs, key)
      })
    }
  }

  handleRegionChange = (region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    this.setState({
      latlng: [latitude, longitude],
      latitudeDelta,
      longitudeDelta
    })
  }

  render() {
    const { name, price, description, photoURLs, latlng, latitudeDelta, longitudeDelta } = this.state;
    return (
      <Content>
        <View style={styles.mapWrap}>
          <MapView
            style={styles.map}
            onRegionChange={this.handleRegionChange}
            region={{
              // TODO: calculate delta for display all markers
              // TODO: map overlay issue
              latitude: latlng[0],
              longitude: latlng[1],
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta
            }}>
          </MapView>

          <View pointerEvents="none" style={styles.markerWrap}>
            <Image
              style={styles.marker}
              pointerEvents="none" 
              source={{ uri: 'https://goo.gl/BiYizF' }} />
          </View>
        </View>

        <ScrollView>
          <ScrollView horizontal>
            <ImageSwiper editable images={photoURLs} onRemove={(key) => this.handleRemove(key)}/>
          </ScrollView>

          <MultiImagePicker onSelect={(uri) => this.handleSelect(uri)} />

          <Form>
            <Item fixedLabel>
              <Label>Product Name</Label>
              <Input value={name} onChangeText={(name) => this.setState({name})} />
            </Item>
            <Item fixedLabel> 
              <Label>Price</Label>
              <Input value={price} onChangeText={(price) => this.setState({price})} />
            </Item>
            <Item fixedLabel>
              <Label>Description</Label>
              <Input value={description} onChangeText={(description) => this.setState({description})} />
            </Item>
          </Form>
          <Button block onPress={() => this.handleUpdate()}><Text>UPDATE</Text></Button>

        </ScrollView>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return { product: state.entities.product.viewed}
}

export default connect(mapStateToProps, { updateProduct })(ProductEdit);