import React, { Component } from 'react';
import { View, Image, StyleSheet, Button, ScrollView } from 'react-native';

/**
 * attributes
 *  - images (required)
 *  - onRemove (optional)
 *  - editable (optional)
 * 
 * Usage
 *  <ImageSwiper editable images={photoURLs} onRemove={(key) => this.handleRemove(key)}/>
 */ 

class ImageSwiper extends Component {
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
      >{this.renderImage()}
      </ScrollView>
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

ImageSwiper.defaultProps = {
  editable: false,
  images: {}
}

export default ImageSwiper;