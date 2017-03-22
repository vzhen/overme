import { StackNavigator } from 'react-navigation'

// Screens
import ProductList from './ProductList'
import ProductCreate from './ProductCreate'
import ProductEdit from './ProductEdit'
import Product from './Product'

const routeConfiguration = {
  ProductList: { screen: ProductList },
  ProductCreate: { screen: ProductCreate },
  ProductEdit: { screen: ProductEdit },
  Product: { screen: Product },
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'screen',
  initialRoute: 'ProductList',
}

export const NavigatorTabProduct = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
