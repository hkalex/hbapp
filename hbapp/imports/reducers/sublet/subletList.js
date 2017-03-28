export default function subletList(state = {
  filter: {
    suburb: '',
    price: { fromPrice: '-1', toPrice: '0', range: '不限' }
  },
  page: 1
}, action = {}) {
  switch (action.type) {
    case 'SUBLET_QUERY_LIST': {
      const filter = action.payload;
      const newfilter = Object.assign({}, state.filter, {
        suburb: filter.suburb ? filter.suburb : state.filter.suburb,
        price: filter.price ? filter.price : state.filter.price
      });

      const newState = Object.assign({}, state, {
        filter: newfilter,
        page: 1
      });
      return newState;
    }

    default:
      return state;
  }
}
