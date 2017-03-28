export function queryInfoAction(filter){
  return{
    type: 'INFO_SEARCH_LISTS',
    payload: filter
  }
}

export function infoListPageChangeAction(){
  return{
    type: 'INFO_LIST_PAGE_CHANGE'
  }
}