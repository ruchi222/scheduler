import React, {useEffect} from "react";
import 'components/Appointment/styles.scss';
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  console.log(props);
    const EMPTY = "EMPTY";
    const SHOW = "SHOW";
    const CREATE = "CREATE";


    const { mode, transition, back } = useVisualMode (
        props.interview ? SHOW : EMPTY
    );



  function save(name, interviewer) {
    console.log("name: ", name , " interviewer: " , interviewer );
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    .then(() => { 
      console.log("Transitioning the show");
      transition(SHOW) });
  }

    useEffect(() => {
    
        if (props.interview && mode === EMPTY) {
          transition(SHOW);
        }
        
        if (!props.interview && mode === SHOW) {
          transition(EMPTY);
        }
    
      }, [mode, transition, props.interview])
    
    
      return (
        <article className="appointment" data-testid="appointment">
          <Header time={props.time} />
          {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
          {mode === SHOW && (
            <Show
              id={props.id}
              student={props.interview.student}
              interviewer={props.interview.interviewer}

            />
          )}
          {mode === CREATE && (
            <Form 
              interviewers={[]}
              onCancel = {back}
              onSave = {save}
         
            />
          )}

       
    </article>
)

}