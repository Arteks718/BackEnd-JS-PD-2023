import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { getUsersThunk, deleteUsersThunk } from "./store/slices/usersSlice";
import { TypeApp } from "./types"

function App({ users, isFetching, error, getUsers, deleteUsers}: TypeApp) {
  useEffect(() => {
    getUsers();
  }, []);
  
  console.log(users)
  return (
    <>
      {error && <div>Error!</div>}
      {isFetching && <div>Loading...</div>}
      <ul>
        Users:{" "}
        {users.map((user, index) => (
          <li key={user.id}>
            {JSON.stringify(user)}
            <button onClick={() => {deleteUsers(user.id)}}>Delete</button>
          </li>
        ))
        }
      </ul>
    </>
  );
}

type TypeMapStateToProps = (state: any) => string[];
type TypeMapDispatchToProps = (dispatch: any) => ({
  getUsers: () => void,
  deleteUsers: (userId: number) => void
});

const mapStateToProps: TypeMapStateToProps = (state) => state.usersData;
const mapDispatchToProps: TypeMapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsersThunk()),
  deleteUsers: (userId) => dispatch(deleteUsersThunk(userId)), // => payload
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
