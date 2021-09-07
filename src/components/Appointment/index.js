import React, {useEffect} from "react";
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  console.log(props);
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const CONFIRM = "CONFIRM";
    const DELETING = "DELETING";

    const { mode, transition, back } = useVisualMode (
        props.interview ? SHOW : EMPTY
    );



  function save(name, interviewer) {
    console.log(name)
    console.log(interviewer)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => { 
      console.log("hitting this")
      transition(SHOW) });
  }


  const deleteAppointment = () => {
    transition(DELETING);
    Promise.resolve(props.cancelInterview(props.id))
      .then(() => transition(EMPTY))
      .catch(err => {
        transition(CONFIRM)
        console.log(err)
      });
  };

    // useEffect(() => {
    
    //     if (props.interview && mode === EMPTY) {
    //       transition(SHOW);
    //     }
        
    //     if (!props.interview && mode === SHOW) {
    //       transition(EMPTY);
    //     }
    
    //   }, [mode, transition, props.interview])
    
    // console.log("props.interviewers", props.interviewers)
      
      return (
        <article className="appointment" data-testid="appointment">
          <Header time={props.time} />
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && (
            <Show
              id={props.id}
              student={props.interview.student}
              interviewer={props.interview.interviewer}
              onDelete={() => transition(CONFIRM)}

            />
          )}
          {mode === CREATE && (
            <Form 
            name={props.name}
            value={props.value}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
         
            />
          )}
            {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you want to delete?"
          onConfirm={deleteAppointment}
          onCancel = {back}
        />
      )}
      {mode === DELETING && (
        <Status 
          message="Deleting"
        />
      )}

       
    </article>
)

}