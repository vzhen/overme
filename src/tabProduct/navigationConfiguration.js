import { StackNavigator } from 'react-navigation'

// Screens
import ProductList from './ProductList'
import ProductCreate from './ProductCreate'

const routeConfiguration = {
  ProductList: { screen: ProductList },
  ProductCreate: { screen: ProductCreate },
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'screen',
  initialRoute: 'ProductList'
}

export const NavigatorTabProduct = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
