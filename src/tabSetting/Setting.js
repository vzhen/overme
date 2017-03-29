import React, { Component } from 'react';
import { View, Image, TextInput, TouchableHighlight, Platform } from 'react-native';
import { Container, Content, Button, Text, H2, Item, Input } from 'native-base';
import { connect } from 'react-redux';
import RNImagePicker from 'react-native-image-picker';
import {
  updateDisplayName,
  updateProfilePicture,
  deleteProfilePicture
} from '../app/actions';

const styles = {
  wrap: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  profileWrap: {
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },

  profilePhotoWrap: {
    marginBottom: 8,
    height: 144,
    width: 144,
    borderRadius: 72,
    position: 'relative'
  },

  profilePhoto: {
    height: 144,
    width: 144,
    borderRadius: 72
  },

  removeButton: {
    position: 'absolute',
    right: -10,
    top: -10
  },

  displayNameWrap: {
  },

  displayName: {
    fontSize: 24
  }
}

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: this.props.auth.displayName
    }
  }

  handleUpdateProfilePicture = () => {
    RNImagePicker.launchImageLibrary({}, (response)  => {
      const uri = Platform.OS === 'ios' ? response.uri.replace('file://', '') : response.uri;
      if (response.didCancel) {

        console.log('User cancelled image picker');

      } else if (response.error) {
        
        console.log('ImagePicker Error: ', response.error);

      } else if (response.customButton) {

        console.log('User tapped custom button: ', response.customButton);

      } else {

        if ( response.type === 'image/jpeg' || response.type === 'image/png' ) {
          this.props.updateProfilePicture(response);
        } else {
          console.log('only image allow');
        }

      } 
    });
  }

  handleUpdateDisplayName = () => {
    this.props.updateDisplayName(this.state.displayName);
  }

  handleRemoveProfilePhoto = () => {
    this.props.deleteProfilePicture();
  }

  renderProfilePhoto = (photoURL) => {
    const { profilePhotoWrap, profilePhoto, removeButton } = styles;
    if (photoURL) {
      return (
        <View>
          <Image style={profilePhoto} source={{ uri: photoURL }} />
          <Button style={removeButton} transparent dark onPress={() => this.handleRemoveProfilePhoto()}>
            <Text>X</Text>
          </Button>
        </View>
      )
    } else {
      return (
        <View>
          <Image style={profilePhoto} source={require('../images/profile_picture.png')} />
        </View>
      )
    }
  }

  render() {
    const { wrap, profileWrap, profilePhotoWrap } = styles;
    const { auth } = this.props;
    return (
      <View style={wrap}>
        
        <View style={profileWrap}>
          <TouchableHighlight 
            style={profilePhotoWrap} 
            underlayColor='#F9F9F9' 
            onPress={() => this.handleUpdateProfilePicture()}
          >
            {this.renderProfilePhoto(auth.photoURL)}
          </TouchableHighlight>
          
          <Item underline>
            <Input
              style={{ textAlign: 'center'}}
              returnKeyType='done'
              placeholder='Your name.'
              value={this.state.displayName}
              onChangeText={(displayName) => this.setState({displayName})}
              onSubmitEditing={() => this.handleUpdateDisplayName()}
            />
          </Item>
        </View>
        
        <View>
          <Button danger block><Text>LOGOUT</Text></Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.entities.auth };
}

export default connect(mapStateToProps, {
  updateDisplayName,
  updateProfilePicture,
  deleteProfilePicture
})(Setting);