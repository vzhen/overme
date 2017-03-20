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
    title: 'Create Product',
    header: ({ state }) => ({
      right: (
        <Button onPress={() => state.params.handlePost()}>
          <Text>POST</Text>
        </Button>
      ),
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      photoUrls: {},
      description: ''
    }
  }

  handleGetLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    })
  }

  postProduct = () => {
    const { name, price, description, photoUrls } = this.state
    this.props.createProduct(name, price, description, photoUrls);
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
    this.props.navigation.setParams({ handlePost: this.postProduct });
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
        </ScrollView>
      </Content>
    )
  }
}

export default connect(null, { createProduct })(ProductCreate);