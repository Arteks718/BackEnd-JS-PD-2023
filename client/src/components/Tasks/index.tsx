import React, { useEffect } from 'react'
import { getTasksThunk } from "../../store/slices/tasksSlice";
import { TypeTasksApp } from '../../types'
import { connect } from 'react-redux';

function Tasks({ tasks, isFetching, error, getTasks }: TypeTasksApp) {
  useEffect(() => {
    getTasks()
  }, [])
  return (
    <>
      {error && <div>Error!</div>}
      {isFetching && <div>Loading...</div>}
      <ul>
        Tasks:{" "}
        {tasks.map((task, index) => (
          <li key={task.id}>
            {JSON.stringify(task)}
            {/* <button onClick={() => {deleteUsers(user.id)}}>Delete</button> */}
          </li>
        ))
        }
      </ul>
    </>
  )
}

type TypeMapStateToProps = (state: any) => string[];
type TypeMapDispatchToProps = (dispatch: any) => ({
  getTasks: () => void
});

const mapStateToProps:TypeMapStateToProps = (state) => state.tasksData
const mapDispatchToProps:TypeMapDispatchToProps = (dispatch) => ({
  getTasks: () => dispatch(getTasksThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)