import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Content, Button, Text, H2  } from 'native-base';
import { connect } from 'react-redux';
import InlineImagePicker from '../common/InlineImagePicker';

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

  pictureWrap: {
    marginBottom: 8,
    height: 144,
    width: 144,
    borderRadius: 72
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
      photoURL: 'https://goo.gl/o2GAOT'
    };
  }

  handleSelect = (uri) => {
    this.setState({
      photoURL: uri
    })
  }

  handleRemove = () => {
    this.setState({
      photoURL: 'https://goo.gl/o2GAOT'
    })
  }

  handleDelete = () => {
    console.log('delete profile picture from firebase');
  }

  render() {
    const { photoURL } = this.state;
    return (
      <View style={styles.wrap}>
        
        <View style={styles.profileWrap}>
          <View style={styles.pictureWrap}> 
            <InlineImagePicker
              url={photoURL}
              onSelect={(uri) => this.handleSelect(uri)}
              onRemove={() => this.handleRemove()}
              onDelete={() => this.handleDelete()}
            />
          </View>
          <View style={styles.displayNameWrap}>
            <H2>Chok Wee Ching</H2>
          </View>
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

export default connect(mapStateToProps)(Setting);