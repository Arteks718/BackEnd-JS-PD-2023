import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { connect } from "react-redux";
import { createHeroThunk } from "../../store/slices/heroesSlice";

function HeroForm({createHero}) {
  const initialValues = {
    nickname: "",
    realName: "",
    originDescription: "",
    catchPhrase: "",
    isGood: true,
  };

  const handleSubmit = (values, formikBag) => {
    createHero(values)
    console.log(values)
    formikBag.resetForm()
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form>
        <label>
          <span>Nickname:</span>
          <Field type="text" name="nickname" placeholder="Superman" />
        </label>
        <br />
        <label>
          <span>Real name:</span>
          <Field type="text" name="realName" placeholder="Klark Kent" />
        </label>
        <br />
        <label>
          <span>Origin Description:</span>
          <Field type="text" name="originDescription" placeholder="Krypton" />
        </label>
        <br />
        <label>
          <span>Catch Phrase:</span>
          <Field type="text" name="catchPhrase" placeholder="I'm superman" />
        </label>
        <br />
        <label>
          <span>Is hero positive:</span>
          <Field type="checkbox" name="isGood" />
        </label>
        <br />
        <button type="submit">CREATE</button>
      </Form>
    </Formik>
  );
}

const mapStateToProps = ({ heroData }) => heroData;
const mapDispatchToProps = (dispatch) => ({
  createHero: (data) => dispatch(createHeroThunk(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroForm);
