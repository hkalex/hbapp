export function querySubletList(filter) {
  return {
    type: 'SUBLET_QUERY_LIST',
    payload: filter
  }
}