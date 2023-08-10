type TypeApp = {
  users: TypeUser[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
  getUsers: any;
  deleteUsers: any;
};

type TypeUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  birthday?: string;
  gender?: EnumGender;
}

interface IUsersState {
  users: string[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
}

enum EnumGender {
  male, female, other
}

export type { IUsersState, TypeApp }