import { TabNavigator } from 'react-navigation';
import TabHomeNavigation from '../tabHome/TabHomeNavigation';
import TabSettingNavigation from '../tabSetting/TabSettingNavigation';
import TabProductNavigation from '../tabProduct/TabProductNavigation';

const routeConfiguration = {
  TabHomeNavigation: { screen: TabHomeNavigation },
  TabProductNavigation: { screen: TabProductNavigation },
  TabSettingNavigation: { screen: TabSettingNavigation },
}

const tabBarConfiguration = {
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