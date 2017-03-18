import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Content, List, Text } from 'native-base';
import { connect } from 'react-redux';
import { getProductsByUserId } from '../app/actions';
import ProductListItem from './ProductListItem';

const styles = {
  content: {
    backgroundColor: '#FFFFFF'
  }
}

class ProductList extends Component {
  static navigationOptions = {
    title: 'Products',
    header: ({ navigate }) => ({
      right: (
        <Button
          title='Add'
          onPress={() => navigate('ProductCreate')}
        />
      ),
    }),
  }

  handleSelect(id) {
    this.props.navigation.navigate('Product', { id });
  }

  handleSelectUser() {
    console.log('select user');
  }

  componentDidMount() {
    this.props.getProductsByUserId('sms|5797235fe618d33da2eb0ad3');
  }

  render() {
    const { products } = this.props;
    const uid = 'sms|5797235fe618d33da2eb0ad3';
    return (
      <Content style={styles.content}>
        <List
          dataArray={products[uid]}
          renderRow={(data, sectionId, rowId) => 
            <ProductListItem
              onSelect={() => this.handleSelect(rowId)}
              onSelectUser={() => this.handleSelectUser()}
              photoUrl={data.photoUrl}
              name={data.name}
              price={data.price}
              ownerName={data.owner.name}
              ownerPhotoUrl={data.owner.photoUrl}
            />
        } />
      </Content>
    )
  }
}

const mapStateToProps = (state) => {
  return { products: state.entities.product.list }
}

export default connect(mapStateToProps, { getProductsByUserId })(ProductList);