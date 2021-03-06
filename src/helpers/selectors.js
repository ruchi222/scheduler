
export function getAppointmentsForDay(state, name) {

  const selDay = state.days.filter(day => day.name === name);
  let arr=[];
  for (let day of selDay) {
    for (let appointment of Object.values(state.appointments)) {
      if (day.appointments.includes(appointment.id)) {
        arr.push(appointment)
      }
    }
  }
  return arr;

}

export function getInterviewersForDay(state, day) {

  const selDay = state.days.filter(day1 => day1.name === day);
  const arr=[];
  if(selDay.length ===0 ) return arr;
  const result = selDay[0].interviewers.map(id1 => state.interviewers[id1]);
  return result;
};

export function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    return { ...interview, interviewer };
  }
  return null;
};
