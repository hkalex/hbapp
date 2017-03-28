export function updateSubletForm(formData) {
  return {
    type: 'SUBLET_UPDATE_FORM',
    formData
  }
}

export function removeSubletForm(formData) {
  return {
    type: 'SUBLET_REMOVE_FORM',
    formData
  }
}