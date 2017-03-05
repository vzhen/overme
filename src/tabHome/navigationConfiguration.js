import { StackNavigator } from 'react-navigation'

// Screens
import Home from './Home'

const routeConfiguration = {
  Home: { screen: Home },
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'screen',
  initialRoute: 'Home'
}

export const NavigatorTabHome = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
