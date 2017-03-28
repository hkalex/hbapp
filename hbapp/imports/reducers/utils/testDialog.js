export default function testDialog(state = {}, action = {}) {
  switch (action.type) {
    case 'SHOW_DIALOG':
      return Object.assign({}, { params: action.params, open: true });
    default:
      return state;
  }
}