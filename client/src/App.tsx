import React, { useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import { getUsersThunk } from "./store/slices/usersSlice";

type TypeApp = {
  users: string[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
  getUsers: any
};

function App({ users, isFetching, error, getUsers }: TypeApp) {
  useEffect(() => {
    getUsers()
  }, []);

  return (
    <>
      {error && <div>Error!</div>}
      {isFetching && <div>Loading...</div>}
      <ul>
        Users:{" "}
        {users.map((user, index) => (
          <li key={index}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    </>
  );
}

type TypeMapStateToProps = (state: any) => string[];
type TypeMapDispatchToProps = (dispatch: any) => void;

const mapStateToProps: TypeMapStateToProps = (state) => state.usersData;
const mapDispatchToProps: TypeMapDispatchToProps = (dispatch) => ({
  getUsers: () => {
    dispatch(getUsersThunk());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App)