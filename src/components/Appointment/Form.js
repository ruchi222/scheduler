import React, { useState } from 'react'
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {
    let [name, setName] = useState(props.name || "");
    let [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");

    const reset = () => {
        setName("")
        setInterviewer(null)
    }

    const cancel = () => {
        reset()
        props.onCancel()
    }

    function validate() {
      if (name === "") {
        setError("Student name cannot be blank");
        return;
      }
    
      setError("");
      props.onSave(name, interviewer);
    }

    console.log(props.interviewers)
    return (
        <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={name} 
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        data-testid="student-name-input"
      />
      <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList interviewers={props.interviewers ? props.interviewers : []} value={interviewer} onChange={setInterviewer} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button danger onClick={validate}>Save</Button>
      {/* <Button confirm onClick={ () => props.onSave(name,interviewer)}>Save</Button> */}
    </section>
  </section>
</main>
    )
}    