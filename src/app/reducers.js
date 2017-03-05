import { combineReducers } from 'redux';

// Navigation Reducers
import { NavigatorTabHome } from '../tabHome/navigationConfiguration';
import { NavigatorTabSetting } from '../tabSetting/navigationConfiguration';
import { NavigatorTabProduct } from '../tabProduct/navigationConfiguration';
import { TabBar } from '../tabBar/navigationConfiguration';

export default combineReducers({
  navigationState: combineReducers({
    tabBar: (state, action) => TabBar.router.getStateForAction(action,state),
    tabHome: (state, action) => NavigatorTabHome.router.getStateForAction(action,state),
    tabSetting: (state, action) => NavigatorTabSetting.router.getStateForAction(action,state),
    tabProduct: (state, action) => NavigatorTabProduct.router.getStateForAction(action,state),
  })
});
