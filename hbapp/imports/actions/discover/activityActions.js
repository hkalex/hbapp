export function activityListPageChangeAction(){
  return{
    type: 'ACTIVITY_LIST_PAGE_CHANGE'
  }
}

export function activitySearchAction(payload){
  return{
    type: 'ACTIVITY_SEARCH_LISTS',
    payload
  }
}