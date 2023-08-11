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
  error: string | null | undefined | unknown;
  getTasks: any;
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
  deadline: string;
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
