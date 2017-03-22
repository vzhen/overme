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
  initialRouteName: 'TabProductNavigation',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    style: {
      backgroundColor: '#ffffff',
      borderTopColor: '#a6a6a6',
      borderTopWidth: 0.5,
      elevation: 0
    },
    labelStyle: {
      color: 'black',
    },
    indicatorStyle: {
      backgroundColor: '#FFFFFF'
    }
    // activeTintColor: 'white',
    // inactiveTintColor: 'blue',
    // actionBackgroundColor: 'white',
    // inactionBackgroundColor: 'white',
  },
}

export const TabBar = TabNavigator(routeConfiguration, tabBarConfiguration)