const INITIAL_STATE = {
  center: [],
  radius: 0,
  nearbyProducts: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
    case 'GETTING_USER_LATLNG':
      return { ...state, center: action.payload.center, radius: action.payload.radius }
    
    case 'GETTING_NEARBY_PRODUCT': {
      const { key, value, distance } = action.payload;
      const mergeValue = Object.assign(value, { distance: distance });
      return { ...state, nearbyProducts: { ...state.nearbyProducts, [key]: mergeValue } }
    }

    default:
      return state;
  }
}