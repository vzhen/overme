import React, { Component } from 'react';
import { Platform, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Button, Text } from 'native-base';
import RNImagePicker from 'react-native-image-picker';

class InlineImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { uri: '' };
  }

  handleOpenImageLibrary = () => {
    RNImagePicker.launchImageLibrary({}, (response)  => {
      if (response.didCancel) {
        // toDoSomething...
      } else {
        const uri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri;
        this.setState({ uri });
        this.props.onSelect(uri);
      }
    });
  }

  handleRemove = () => {
    this.setState({ uri: '' });
    this.props.onRemove();
  }

  handleDelete = () => {
    this.props.onDelete();
  }

  renderImage = () => {
    let { url } = this.props;
    const { uri } = this.state;
    const { profileImageWrap, profileImage, removeButton } = styles;
    if (uri) {
      url = '';

      // render temporary image
      return (
        <View style={profileImageWrap}>
          <Image style={profileImage} source={{ uri }} />
          <Button transparent dark style={removeButton} onPress={() => this.handleRemove()}>
            <Text>x</Text>
          </Button>
        </View>
      )
    } else if (url) {

      // render url photo
      return (
        <View style={profileImageWrap}>
          <Image source={{ uri: url }} style={profileImage} />
          <Button transparent dark style={removeButton} onPress={() => this.handleDelete()}>
            <Text>X</Text>
          </Button>
        </View>
      )
    } else {

      // render default image
      return <Image
              source={require('../images/profile_picture.png')}
              style={styles.profileImage}
            />
    }
  }
 
  render() {
    return (
      <TouchableHighlight
        style={styles.wrap}
        underlayColor='#F9F9F9'
        onPress={() => this.handleOpenImageLibrary()
      }>
        {this.renderImage()}
      </TouchableHighlight>
    )
  }
}

const styles = {
  wrap: {
    height: 144,
    width: 144,
    borderRadius: 72
  },
  profileImage: {
    height: 144,
    width: 144,
    borderRadius: 72
  },
  profileImageWrap: {
    position: 'relative'
  },
  removeButton: {
    position: 'absolute',
    right: -10,
    top: -10
  }
}

InlineImagePicker.defaultProps = {
  url: ''
}

export default InlineImagePicker;