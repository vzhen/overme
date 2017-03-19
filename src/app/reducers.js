import { combineReducers } from 'redux';
import AuthReducer from '../splashScreen/AuthReducer';
import ProductReducer from '../tabProduct/ProductReducer';
import HomeReducer from '../tabHome/HomeReducer';

// Navigation Reducers
import { NavigatorTabHome } from '../tabHome/navigationConfiguration';
import { NavigatorTabSetting } from '../tabSetting/navigationConfiguration';
import { NavigatorTabProduct } from '../tabProduct/navigationConfiguration';
import { TabBar } from '../tabBar/navigationConfiguration';
import { AppNavigator } from './navigationConfiguration';

export default combineReducers({
  entities: combineReducers({
    auth: AuthReducer,
    product: ProductReducer,
    home: HomeReducer,
  }),

  navigationState: combineReducers({
    tabBar: (state, action) => TabBar.router.getStateForAction(action,state),
    app: (state, action) => AppNavigator.router.getStateForAction(action,state),
    tabHome: (state, action) => NavigatorTabHome.router.getStateForAction(action,state),
    tabSetting: (state, action) => NavigatorTabSetting.router.getStateForAction(action,state),
    tabProduct: (state, action) => NavigatorTabProduct.router.getStateForAction(action,state),
  })
});
