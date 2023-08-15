import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as yup from "yup";
import { connect } from 'react-redux';
import { addNewTaskThunk, isOpenNewTaskWindow } from '../../../store/slices/tasksSlice';

const TaskFormSchema = yup.object().shape({
  body: yup.string().min(3, 'Too Short!').max(1000, 'Too Long!').required('Required'),
  isDone: yup.boolean().required('Required!').default(false),
  deadline: yup.date().min(new Date())
})

function AddNewTaskForm(newTask: any, isNewTask: any) {
  return (
    <div>
      <Formik
        initialValues={{
          body: '',
          isDone: false,
          deadline: ''
        }}
        validationSchema={TaskFormSchema}
        onSubmit={
          async(values) => {
            console.log(values)
            
            values.body = ''
            values.isDone = false
            values.deadline = ''
          }
        }
      >
        <Form>
          <label htmlFor="body">Body</label>
          <Field id="body" name="body" placeholder="Homework" />
          <label htmlFor="isDone">isDone</label>
          <Field type="checkbox" id="isDone" name="isDone" />
          <label htmlFor="deadline">Deadline</label>
          <Field type="datetime-local" name="deadline"></Field>
          <div>
            <button type="submit">OK</button>
            <button onClick={() => {newTask()}}>CANCEL</button>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

const mapStateToProps = (state: any) => state.tasksData
const mapDispatchToProps = (dispatch: any) => ({
  newTask: () => dispatch(addNewTaskThunk()),
  isNewTask: () => dispatch(isOpenNewTaskWindow())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewTaskForm);