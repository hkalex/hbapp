export default function subletForm(state = {}, action = {}) {
  switch (action.type) {
    case 'SUBLET_UPDATE_FORM':
      {
        let formData = Object.assign({}, state.formData, action.formData);
        return formData;
      }

    case 'SUBLET_REMOVE_FORM':
      return {};

    default:
      return state;
  }
}