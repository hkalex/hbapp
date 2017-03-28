import logger from '../../loggers/logger';

export default function activityList(state = {
  filter: {location: {text: '不限', code: 'ALL'} },
  page: 1
}, action = {}) {
  switch (action.type) {
    case 'ACTIVITY_SEARCH_LISTS':

      let filter = action.payload;

      let result = Object.assign({}, state, { filter, page: 1 });
      return result;

    // TODO: tags header dispatch actions to change below
    case 'ACTIVITY_LIST_PAGE_CHANGE':
      // take the currentPageNumber from the payload
      return Object.assign({},state, {
        page: state.page + 1
      });

    default:
      return state;
  }
}