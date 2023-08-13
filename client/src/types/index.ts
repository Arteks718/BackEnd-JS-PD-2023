import { ReactNode } from "react";

type TypeUsersApp = {
  users: TypeUser[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
  getUsers: any;
  deleteUsers: any;
};

type TypeTasksApp = {
  tasks: TypeTask[];
  isFetching: boolean;
  error: string | null | undefined;
  getTasks: any;
  deleteTask: any
};

type TypeUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  birthday?: string;
  gender?: EnumGender;
};

type TypeTask = {
  id:number;
  body: string;
  isDone: boolean;
  deadline: Date;
  createdAt?: any;
  updatedAt?: Date;
};

interface IUsersState {
  users: TypeUser[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
}

interface ITasksState {
  tasks: TypeTask[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
}

enum EnumGender {
  male,
  female,
  other,
}

export type { IUsersState, ITasksState, TypeUsersApp, TypeTasksApp, TypeUser };
