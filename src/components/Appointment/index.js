import React, {useEffect} from "react";
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {

    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";
    const CONFIRM = "CONFIRM";
    const SAVING = "SAVING";
    const DELETING = "DELETING";
    const EDIT = "EDIT";
    const ERROR_SAVE = "ERROR_SAVE";
    const ERROR_DELETE = "ERROR_DELETE";

    const { mode, transition, back } = useVisualMode (
        props.interview ? SHOW : EMPTY
    );



    useEffect(() => {
    
      if (props.interview && mode === EMPTY) {
        transition(SHOW);
      }
      
      if (!props.interview && mode === SHOW) {
        transition(EMPTY);
      }
  
    }, [mode, transition, props.interview])


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
      props.bookInterview(props.id, interview)
    .then(() => { 
      transition(SHOW) })
      .catch(err => {
        transition(ERROR_SAVE, true)
      })
  }

  function edit() {
    transition(EDIT)
  };

  const deleteAppointment = () => {
      transition(DELETING, true)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
    
  };

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
              OnEdit={() => edit()}

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
             {mode === SAVING && <Status message="Saving" />}
         
            {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you want to delete?"
          onConfirm={ () => {deleteAppointment()}}
          onCancel = { () => {back()}}
        />
      )}
      {mode === DELETING && (
        <Status 
          message="Deleting"
        />
      )}

      {mode === EDIT && (
        <Form 
            name={props.name ? props.name : props.interview.student}
            value={props.value}
            interviewers={props.interviewers}
            onSave={save}
            onCancel={back}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error 
          message="Could not create app"
          onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error 
          message="Could not cancel appointment"
          onClose={back}
        />
      )}
       
    </article>
)

}