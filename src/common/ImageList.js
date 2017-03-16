import React, { Component } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';

/**
 * attributes
 *  - images (required)
 *  - onRemove (optional)
 *  - editable (optional)
 * 
 * Usage
 *  <ImageList editable images={photoURLs} onRemove={(key) => this.handleRemove(key)}/>
 */ 

class ImageList extends Component {
  handleRemove = (key) => {
    this.props.onRemove(key);
  }

  renderRemoveButton = (key) => {
    if (this.props.editable) {
      return <Button onPress={() => this.handleRemove(key)} title='X' />
    }
  }

  renderImage = () => {
    return Object.keys(this.props.images).map((key, index) => {
      return (
        <View key={key}>
          <Image source={{ uri: this.props.images[key] }} style={styles.imagePreview} />
          {this.renderRemoveButton(key)}
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.container} >{this.renderImage()}</View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  imagePreview: {
    height: 250,
    width: 250,
  }
})

ImageList.defaultProps = {
  editable: false,
  images: {}
}

export default ImageList;