const INITIAL_STATE = {
  userPosition: {},
  radius: 0,
  nearbyProducts: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'GETTING_NEARBY_PRODUCTS': {
      const { position, radius, key, location, distance, value } = action.payload;
      const mergeValue = Object.assign(value, { distance: distance }, { location: location });
      return { ...state,
        nearbyProducts: { ...state.nearbyProducts, [key]: mergeValue },
        userPosition: position,
        radius
      }
    }

    default:
      return state;
  }
}