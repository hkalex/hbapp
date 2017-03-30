export default function myFolderList(state = {
  filter: 'favorites',
  page: 1
}, action = {}) {
  switch (action.type) {
    // TODO: change filter here 
    // case 'PROJECT_SEARCH_LISTS':    
    //   let result = Object.assign({}, state, { filter: mongoFilter });
    //   return result;

    // TODO: tags header dispatch actions to change below

    case 'MY_FOLDER_FILTER_CHANGE':

      return Object.assign({}, state, {
        filter: action.payload,
        page: 1
      });

    case 'FOLDER_LIST_PAGE_CHANGE':
      // take the currentPageNumber from the payload
      return Object.assign({},state, {
        page: state.page + 1
      });

    default:
      return state;
  }
}
