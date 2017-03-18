import React, { Component } from 'react';
import { Dimensions, View, Text, ScrollView, StyleSheet } from 'react-native';
import { Thumbnail, Content, H1, H2, H3, Left, Right, Card, CardItem, Grid, Col, Row } from 'native-base';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';
import { getProductById } from '../app/actions';
import ImageList from '../common/ImageList';

const { width, height } = Dimensions.get('window');

const styles = {
  content: {
    backgroundColor: '#FFFFFF'
  },

  ownerWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom : 10,
    borderBottomWidth: 1,
    borderColor: '#F1F1F1'
  },

  titleWrap: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom : 10
  },

  detailWrap: { 
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom : 10
  },

  title: { flex: 3 },
  price: { flex: 1, alignItems: 'flex-end' },
  
  mapWrap: {
    position: 'relative',
    height: 300,
    width: width - 30,
    marginLeft: 15,
    marginRight: 15
  },
  map: {
    ...StyleSheet.absoluteFillObject,
 },
}

class Product extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    this.props.getProductById(this.props.navigation.state.params.id);
  }

  renderOwner(data) {
    if (data) {
      return (
        <View style={styles.ownerWrap}>
          <Thumbnail small source={{ uri: data.photoUrl }} />
          <Text style={{ paddingLeft: 10 }}>{data.name}</Text>
        </View>
      )
    }
  }

  renderMarkers(data) {
    if (data) {
      return (
        <MapView.Marker
          coordinate={{ latitude: data[0], longitude: data[1] }}
          title='title'
        />
      )
    }
  }

  render() {
    const { navigation, product } = this.props;
    const productId = navigation.state.params.id;
    return (
      <Content style={styles.content}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <ScrollView horizontal>
            <ImageList images={product.photoUrls} />
          </ScrollView>

          {this.renderOwner(product.owner)}

          <View style={styles.detailWrap}>
            <View style={styles.titleWrap}>
              <View style={styles.title}><H3>{product.name}</H3></View>
              <View style={styles.price}><Text style={{ fontSize: 16 }}>RM {product.price}</Text></View>
            </View>
            <Text>{product.description}</Text>
          </View> 

          <View style={styles.mapWrap}>
            <MapView
              style={styles.map}
              region={{
                latitude: 38.784,
                longitude: -122.41,
                latitudeDelta: 0.9,
                longitudeDelta: 0.9,
              }}>
              {this.renderMarkers(product.l)}
            </MapView>
          </View>
        </View>
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return { product: state.entities.product.viewed };
}

export default connect(mapStateToProps, { getProductById })(Product);