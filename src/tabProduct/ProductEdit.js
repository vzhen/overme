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

class ProductEdit extends Component {
  render() {
    return (
      <View>
        <Text>Product Editing</Text>
      </View>
    )
  }
}

export default ProductEdit;