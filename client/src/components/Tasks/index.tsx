import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getTasksThunk, deleteTaskThunk } from "../../store/slices/tasksSlice";
import { TypeTasksApp } from "../../types";
import styles from "./Tasks.module.sass";

function Tasks({
  tasks,
  isFetching,
  error,
  getTasks,
  deleteTask,
}: TypeTasksApp) {
  useEffect(() => {
    getTasks();
  }, []);
  const isEmptyTasks = () => {
    const isEmpty = tasks.length === 0 ? true : false;
    return isEmpty
  }
  return (
    <div className={styles.container}>
      <h1>Tasks</h1>
      {error && <div>Error! {error}</div>}
      {isFetching && <div>Loading...</div>}
      {isEmptyTasks() && <div>Empty Tasks</div>}
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
          <tbody>
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.body}</td>
              <input type="checkbox" checked={task.isDone} />
              <td>{new Date(task.deadline).toLocaleString("uk-UA")}</td>
              <td>{new Date(task.createdAt).toLocaleString("uk-UA")}</td>
              <button
                onClick={() => {
                  deleteTask(task.id);
                }}
              >
                DELETE
              </button>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

type TypeMapStateToProps = (state: any) => string[];
type TypeMapDispatchToProps = (dispatch: any) => {
  getTasks: () => void;
  deleteTask: (taskId: number) => void;
};

const mapStateToProps: TypeMapStateToProps = (state) => state.tasksData;
const mapDispatchToProps: TypeMapDispatchToProps = (dispatch) => ({
  getTasks: () => dispatch(getTasksThunk()),
  deleteTask: (taskId) => dispatch(deleteTaskThunk(taskId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
