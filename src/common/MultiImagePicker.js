import React, { Component } from 'react';
import RNImagePicker from 'react-native-image-picker';
import { Platform, View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Text } from 'native-base';

class MultiImagePicker extends Component {
  handleOpenImageLibrary = () => {
    RNImagePicker.launchImageLibrary({}, (response)  => {
      if (response.didCancel) {
        // toDoSomething...
      } else {
        this.props.onSelect(response);
      }
    });
  }

  render() {
    return (
      <View>
        <Button light onPress={() => this.handleOpenImageLibrary()}>
          <Text>Upload Photos</Text>
        </Button>
      </View>
    )
  }
}

export default MultiImagePicker;