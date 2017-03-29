import { StackNavigator } from 'react-navigation'

// Screens
import Home from './Home'
import Product from '../tabProduct/Product'

const routeConfiguration = {
  Home: { screen: Home },
  Product: { screen: Product }
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'screen',
  initialRoute: 'Home'
}

export const NavigatorTabHome = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
