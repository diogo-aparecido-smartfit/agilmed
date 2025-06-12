import { setupDependencies } from "../config/dependencies";
type Constructor<T> = new (...args: any[]) => T;

export class Container {
  private services: Map<string, any> = new Map();
  private factories: Map<string, () => any> = new Map();
  private isInitialized = false;

  private initializeDependencies() {
    if (this.isInitialized) return;

    setupDependencies();
    this.isInitialized = true;
  }

  register<T>(token: string, instance: T): void {
    this.services.set(token, instance);
  }

  registerFactory<T>(token: string, factory: () => T): void {
    this.factories.set(token, factory);
  }

  resolve<T>(token: string): T {
    this.initializeDependencies();

    if (this.services.has(token)) {
      return this.services.get(token) as T;
    }

    if (this.factories.has(token)) {
      const factory = this.factories.get(token)!;
      const instance = factory();
      this.services.set(token, instance);
      return instance as T;
    }

    throw new Error(`Dependência não registrada: ${token}`);
  }

  registerType<T>(token: string, Type: Constructor<T>): void {
    this.registerFactory(token, () => new Type());
  }
}

export const container = new Container();
