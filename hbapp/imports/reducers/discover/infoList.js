export default function infoList(state = {
  filter: { location: {text: '不限', code: 'ALL'},
            classes: {title:'不限',code:'ALL'}
          },
  page: 1
}, action = {}) {
  switch (action.type) {
    case 'INFO_SEARCH_LISTS':
      let filter = action.payload;

      let result = Object.assign({}, state, {filter, page:1});

      return result;

    // TODO: tags header dispatch actions to change below
    case 'INFO_LIST_PAGE_CHANGE':
      // take the currentPageNumber from the payload
      return Object.assign({},state, {
        page: state.page + 1
      });

    default:
      return state;
  }
}