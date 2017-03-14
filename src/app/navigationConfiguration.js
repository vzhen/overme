import { StackNavigator } from 'react-navigation'
import SplashScreenNavigation from '../splashScreen/SplashScreenNavigation';
import TabBarNavigation from '../tabBar/TabBarNavigation';

const routeConfiguration = {
  SplashScreenNavigation: { screen: SplashScreenNavigation },
  TabBarNavigation: { screen: TabBarNavigation },
}

// going to disable the header for now
const stackNavigatorConfiguration = { 
  headerMode: 'none',
  initialRouteName: 'SplashScreenNavigation'
}
 
export const AppNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
  