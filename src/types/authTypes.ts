interface IUser {
  id: number;
  name: String;
  email: string;
  password: string;
  confirmPassword: string;
}

type SignUpUserType = Omit<IUser, "id">;
type CreateUserType = Omit<IUser, "id" | "confirmPassword">;
type SignInUserType = Omit<IUser, "id" | "confirmPassword" | "name">;

export { IUser, SignUpUserType, CreateUserType, SignInUserType};
