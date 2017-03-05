import { StackNavigator } from 'react-navigation'

// Screens
import Setting from './Setting'

const routeConfiguration = {
  Setting: { screen: Setting },
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRoute: 'Setting'
}

export const NavigatorTabSetting = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
