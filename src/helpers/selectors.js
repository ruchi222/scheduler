
const getAppointmentsForDay = function (state,day) {
  
} 


function selectUserByName(state, name) {
    const filteredNames = state.users.filter(user => user.name === name);
    return filteredNames;
  }