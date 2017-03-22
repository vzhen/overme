import React, { Component } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import _ from 'lodash';
import MapView from 'react-native-maps';
import { createProduct } from '../app/actions';
import MultiImagePicker from '../common/MultiImagePicker';
import ImageList from '../common/ImageList';

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

class ProductCreate extends Component {
  static navigationOptions = {
    title: 'Create Product'
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      photoURLs: {},
      description: '',
      latlng: [30, 170],
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }
  }

  handleGetLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({
        latlng: [latitude, longitude]
      })
    })
  }

  handleRegionChange = (region) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    this.setState({
      latlng: [latitude, longitude],
      latitudeDelta,
      longitudeDelta
    })
  }

  handlePost = () => {
    // BUG: uploaded photo not in image format.
    const { name, price, description, photoURLs, latlng } = this.state
    this.props.createProduct(name, price, photoURLs, latlng, description);
  }

  handleRemove = (key) => {
    this.setState({
      photoURLs: _.omit(this.state.photoURLs, key)
    })
  }

  handleSelect = (uri) => {
    const uuid = uuidV4();
    this.setState({
      photoURLs: { ...this.state.photoURLs, [uuid]: uri }
    })
  }

  componentDidMount() {
    this.handleGetLocation(); 
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

        <ScrollView horizontal>
          <ImageList editable images={photoURLs} onRemove={(key) => this.handleRemove(key)}/>
        </ScrollView>

        <ScrollView>

          <Form>
            <Item fixedLabel>
              <MultiImagePicker onSelect={(uri) => this.handleSelect(uri)} />
            </Item>
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

          <Button block onPress={() => this.handlePost()}><Text>POST</Text></Button>

        </ScrollView>
      </Content>
    )
  }
}

export default connect(null, { createProduct })(ProductCreate);