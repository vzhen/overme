import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import _ from 'lodash';
import { createProduct } from '../app/actions';
import MultiImagePicker from '../common/MultiImagePicker';
import ImageList from '../common/ImageList';

class ProductCreate extends Component {
  static navigationOptions = {
    title: 'Create Product'
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      photoUrls: {},
      description: '',
      latlng: [30, 170]
    }
  }

  handleGetLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latlng: [position.coords.latitude, position.coords.longitude]
      })
    })
  }

  handlePost = () => {
    const { name, price, description, photoUrls, latlng } = this.state
    this.props.createProduct(name, price, photoUrls, latlng, description);
  }

  handleRemove = (key) => {
    this.setState({
      photoUrls: _.omit(this.state.photoUrls, key)
    })
  }

  handleSelect = (uri) => {
    const uuid = uuidV4();
    this.setState({
      photoUrls: { ...this.state.photoUrls, [uuid]: uri }
    })
  }

  componentDidMount() {
    this.handleGetLocation(); 
  }

  render() {
    const { name, price, description, photoUrls } = this.state;
    return (
      <Content>
        <ScrollView horizontal>
          <ImageList editable images={photoUrls} onRemove={(key) => this.handleRemove(key)}/>
        </ScrollView>
        <ScrollView>
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
          <Button block onPress={() => this.handlePost()}><Text>POST</Text></Button>
        </ScrollView>
      </Content>
    )
  }
}

export default connect(null, { createProduct })(ProductCreate);