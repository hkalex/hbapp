import logger from '../../loggers/logger';

export default function offPlanList(state = {
  filter: {
    location: { city: 'ALL', country: 'ALL', title: '不限' },
    price: { fromPrice: '-1', toPrice: '0', range: '不限' }
  },
  page: 1
}, action = {}) {
  switch (action.type) {
    case 'OFFPLAN_SEARCH_LISTS':

      let filter = action.payload;
      let newfilter = Object.assign({}, state.filter, {
        location: filter.location ? filter.location : state.filter.location,
        price: filter.price ? filter.price : state.filter.price
      });

      let result = Object.assign({}, state, {
        filter: newfilter,
        page: 1
      });
      return result;

    // TODO: tags header dispatch actions to change below
    case 'OFFPLAN_LIST_PAGE_CHANGE':
      // take the currentPageNumber from the payload
      return Object.assign({}, state, {
        page: state.page + 1
      });

    default:
      return state;
  }
}
