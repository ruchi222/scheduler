import React from "react";
import "components/Application.scss";
import Appointment from "components/Appointment/index.js";
import DayList from "components/DayList";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
  
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  

   const dailyAppointments = getAppointmentsForDay(state, state.day);
   const dailyInterviewers = getInterviewersForDay(state, state.day);
   const appointmentList = dailyAppointments.map(appointment => { 
     const interview = getInterview(state, appointment.interview);
    return(
      <Appointment 
      key={appointment.id}
      {...appointment}
      time={appointment.time} 
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    )
   })

  return (
    
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
      />
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
    days={state.days}
    day={state.day}
    setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      
      {appointmentList}
      <Appointment key="last" time="5pm"  />
      </section>
    </main>
  );

}

