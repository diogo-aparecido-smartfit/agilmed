export interface IRepository<T> {
  create(data: any): Promise<T>;
  findById(id: number): Promise<T | null>;
  findAll(filters?: any): Promise<T[]>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  delete(id: number): Promise<void>;
}
