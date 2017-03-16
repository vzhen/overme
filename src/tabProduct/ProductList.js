import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Content, List, Text } from 'native-base';
import ProductListItem from './ProductListItem';


const mockData = { 
  id1: { 
    name: 'Apple iPhone 5', 
    photoUrl: 'https://goo.gl/Um6zzq', 
    price: '2499',
    owner: {
      name: 'Chok Wee Ching',
      photoUrl: 'https://goo.gl/o2GAOT'
    }
  },
  id2: { 
    name: 'Xiaomi Redmi note 4', 
    photoUrl: 'https://goo.gl/EcxG0S', 
    price: '800',
    owner: {
      name: 'Chok Wee Ching',
      photoUrl: 'https://goo.gl/o2GAOT'
    }
  },
  id3: { 
    name: 'Mi Box', 
    photoUrl: 'https://goo.gl/jYwx8i', 
    price: '300',
    owner: {
      name: 'Chok Wee Ching',
      photoUrl: 'https://goo.gl/o2GAOT'
    }
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

  render() {
    return (
      <Content>
        <List
          dataArray={mockData}
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

export default ProductList;