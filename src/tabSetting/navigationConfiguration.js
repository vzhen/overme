import { StackNavigator } from 'react-navigation'

// Screens
import Setting from './Setting'

const routeConfiguration = {
  Setting: { screen: Setting },
}

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRoute: 'Setting'
}

export const NavigatorTabSetting = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
