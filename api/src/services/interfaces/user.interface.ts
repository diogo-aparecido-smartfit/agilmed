import {
  User,
  UserAttributes,
  UserCreationAttributes,
} from "../../models/user.model";

export interface IUserService {
  createUser(data: UserCreationAttributes): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  updateUser(id: number, data: Partial<UserAttributes>): Promise<User | null>;
  getAllUsers(filters?: any): Promise<User[]>;
  deleteUser(id: number): Promise<boolean>;
  getUserByEmailOrCpf(identifier: string): Promise<User | null>;
}
