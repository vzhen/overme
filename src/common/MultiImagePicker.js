import React, { Component } from 'react';
import RNImagePicker from 'react-native-image-picker';
import { Platform, Button, View, Text, StyleSheet, Image, ScrollView } from 'react-native';

class MultiImagePicker extends Component {
  handleOpenImageLibrary = () => {
    RNImagePicker.launchImageLibrary({}, (response)  => {
      if (response.didCancel) {
        // toDoSomething...
      } else {
        const uploadUri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri;
        this.props.onSelect(uploadUri);
      }
    });
  }

  render() {
    return (
      <View>
        <Button onPress={() => this.handleOpenImageLibrary()} title='Choose Photo' />
      </View>
    )
  }
}

export default MultiImagePicker;