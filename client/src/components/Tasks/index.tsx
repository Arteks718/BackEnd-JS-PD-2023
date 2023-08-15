import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getTasksThunk,
  deleteTaskThunk,
  isOpenNewTaskWindow,
  addNewTaskThunk
} from "../../store/slices/tasksSlice";
import CreateTaskForm from "./AddNewTaskForm.tsx";
import { TypeTasksApp } from "../../types";
import styled from "./Tasks.module.sass";

function Tasks({
  tasks,
  isFetching,
  error,
  isEmpty,
  isOpenNewTask,
  getTasks,
  deleteTask,
  isNewTask,
  createTask
}: TypeTasksApp) {
  useEffect(() => {
    getTasks();
    // createTask()
  }, []);
  return (
    <div className={styled.container}>
      <h1>Tasks</h1>
      {error && <div>Error! {error}</div>}
      {isFetching && <div>Loading...</div>}
      {isEmpty && <div>Empty Tasks</div>}
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Body</th>
            <th>isDone</th>
            <th>Deadline</th>
            <th>Created</th>
          </tr>
        </thead>

        {tasks.map((task, index) => (
          <tbody key={task.id}>
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.body}</td>
              <td>
                <input type="checkbox" checked={task.isDone} />
              </td>
              <td>{new Date(task.deadline).toLocaleString("uk-UA")}</td>
              <td>{new Date(task.createdAt).toLocaleString("uk-UA")}</td>
              <td>
                <button onClick={() => deleteTask(task.id)}>DELETE</button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
      <div className={styled.newTask}>
        <button onClick={isNewTask}>CREATE NEW TASK</button>
        {isOpenNewTask && (
          <div className={styled.newTaskBlock}>
            <CreateTaskForm />
          </div>
        )}
      </div>
    </div>
  );
}

type TypeMapStateToProps = (state: any) => string[];
type TypeMapDispatchToProps = (dispatch: any) => {
  getTasks: () => void;
  deleteTask: (taskId: number) => void;
  isNewTask: () => boolean;
  createTask: () => void
};

const mapStateToProps: TypeMapStateToProps = (state) => state.tasksData;
const mapDispatchToProps: TypeMapDispatchToProps = (dispatch) => ({
  getTasks: () => dispatch(getTasksThunk()),
  deleteTask: (taskId) => dispatch(deleteTaskThunk(taskId)),
  isNewTask: () => dispatch(isOpenNewTaskWindow()),
  createTask: () => dispatch(addNewTaskThunk())
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
