import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import uuidV4 from 'uuid/v4';
import _ from 'lodash';
import MultiImagePicker from '../common/MultiImagePicker';
import ImageList from '../common/ImageList';
import { createProduct } from '../app/actions';

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
      photoURLs: {},
      description: ''
    }
  }

  postProduct = () => {
    const { name, price, description, photoURLs } = this.state;
    this.props.createProduct(name, price, description, photoURLs);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handlePost: this.postProduct });
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

  render() {
    const { name, price, description, photoURLs } = this.state;
    return (
      <Content>
        <ScrollView horizontal>
          <ImageList editable images={photoURLs} onRemove={(key) => this.handleRemove(key)}/>
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