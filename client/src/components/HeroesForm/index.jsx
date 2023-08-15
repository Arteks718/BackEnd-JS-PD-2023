import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

function HeroForm() {
  const initialValues = {
    nickname: "",
    realName: "",
    originDescription: "",
    catchPhrase: "",
    isGood: true,
  };

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      <Form>
        <label htmlFor="nickname">
          <span>Nickname:</span>
          <Field type="text" name="nickname" placeholder="Superman"/>
        </label>
        <br />
        <label htmlFor="realName">
          <span>Real name:</span>
          <Field type="text" name="realName" placeholder="Klark Kent"/>
        </label>
        <br />
        <label htmlFor="originDescription">
          <span>Origin Description:</span>
          <Field type="text" name="originDescription" placeholder="Krypton"/>
        </label>
        <br />
        <label htmlFor="catchPhrase">
          <span>Catch Phrase:</span>
          <Field type="text" name="catchPhrase" placeholder="I'm superman"/>
        </label>
        <br />
        <label htmlFor="nickname">
          <span>Is hero positive:</span>
          <Field type="checkbox" name="isDone"/>
        </label>
        <br />
        <button type="submit">CREATE</button>
      </Form>
    </Formik>
  );
}

export default HeroForm;
