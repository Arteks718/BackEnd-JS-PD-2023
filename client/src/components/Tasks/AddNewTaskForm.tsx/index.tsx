import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { connect } from "react-redux";
import {
  addNewTaskThunk,
} from "../../../store/slices/tasksSlice";
import { TypeTask } from "../../../types";

const TaskFormSchema = yup.object().shape({
  body: yup
    .string()
    .min(3, "Too Short!")
    .max(1000, "Too Long!")
    .required("Required"),
  isDone: yup.boolean().required("Required!").default(false),
  deadline: yup.date().min(new Date()),
});

function CreateTaskForm(createTask: any) {
  useEffect(() => {
    createTask()
  }, [])
  const handleSubmit = (values: TypeTask, formikBag?: any) => {
    console.log(values)
    formikBag.resetForm()
  }
  return (
    <div>
      <Formik
        initialValues={{
          body: "",
          isDone: false,
          deadline: new Date(),
        }}
        validationSchema={TaskFormSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label htmlFor="body">
            <span>Body</span>
            <Field id="body" name="body" placeholder="Homework" />
          </label>

          <label htmlFor="isDone">
            <span>isDone</span>
            <Field type="checkbox" id="isDone" name="isDone" />
          </label>

          <label htmlFor="deadline">
            <span>Deadline</span>
            <Field type="datetime-local" name="deadline"></Field>
          </label>

          <div>
            <button type="submit">OK</button>
            <button onClick={() => {}}>CANCEL</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

type TypeMapStateToProps = (state: any) => string[]
type TypeMapDispatchToProps = (dispatch: any) => {
  createTask: () => void
};

const mapStateToProps: TypeMapStateToProps = (state) => state.tasksData;
const mapDispatchToProps: TypeMapDispatchToProps = (dispatch: any) => ({
  createTask: () => dispatch(addNewTaskThunk()),
  // isNewTask: () => dispatch(isOpenNewTaskWindow())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);
