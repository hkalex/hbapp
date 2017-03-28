import Roles from 'meteor/alanning:roles'

/**
 * @description give a existing user a Role. 
 * @export addUserRole.
 * @param {id: id, roles: [role1,role2...]} payload contains roles in an array. 
 * @returns Meteor methods addUser.
 */
export function addUsersToRoles(payload) {
  return (dispatch) => {
    Roles.addUsersToRoles(payload.id, payload.roles);

    if(Roles.userIsInRole(payload.id, payload.roles)){
      // TODO: dispatch Add role success 
    } else {
      // TODO: dispatch add role failed. 
    }
  }
}
