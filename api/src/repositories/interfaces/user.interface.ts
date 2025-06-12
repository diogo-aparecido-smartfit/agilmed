import {
  User,
  UserAttributes,
  UserCreationAttributes,
} from "../../models/user.model";
import { IRepository } from "./repository.interface";

export interface IUserRepository extends IRepository<User> {
  createUser(data: UserCreationAttributes): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  updateUser(id: number, data: Partial<UserAttributes>): Promise<User | null>;
  deleteUser(id: number): Promise<boolean>;
  getAllUsers(filters?: any): Promise<User[]>;
  findByEmailOrCpf(identifier: string): Promise<User | null>;
}
