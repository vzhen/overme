import { TabNavigator } from 'react-navigation';
import TabHomeNavigation from '../tabHome/TabHomeNavigation';
import TabSettingNavigation from '../tabSetting/TabSettingNavigation';
import TabProductNavigation from '../tabProduct/TabProductNavigation';

const routeConfiguration = {
  TabProductNavigation: { screen: TabProductNavigation },
  TabHomeNavigation: { screen: TabHomeNavigation },
  TabSettingNavigation: { screen: TabSettingNavigation },
}

const tabBarConfiguration = {
  initialRouteName: 'TabHomeNavigation',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    // activeTintColor: 'white',
    // inactiveTintColor: 'blue',
    // activeTintColor: 'white',
    // actionBackgroundColor: 'blue',
    // inactionBackgroundColor: 'white',
  }
}

export const TabBar = TabNavigator(routeConfiguration, tabBarConfiguration)