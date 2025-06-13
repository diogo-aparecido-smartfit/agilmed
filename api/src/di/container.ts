import { DependenciesMap, DependencyKey, DependencyMap } from "./maps";
import { setupDependencies } from "./registry";

class Container {
  private dependencies: DependenciesMap = new Map();
  private initialized = false;
  private static instance: Container | null = null;

  private constructor() {}

  private initializeDependencies() {
    if (this.initialized) return;

    setupDependencies();
    this.initialized = true;
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }

    return Container.instance;
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  register<Key extends DependencyKey>(
    token: Key,
    dependency: DependencyMap[Key]
  ): void {
    this.dependencies.set(token, dependency);
    this.initialized = true;
  }

  resolve<Key extends DependencyKey>(token: Key): DependencyMap[Key] {
    this.initializeDependencies();

    if (!this.initialized) {
      throw new Error(
        "Container not initialized. Make sure setupDependencies() is called before accessing services."
      );
    }

    const dependency = this.dependencies.get(token);

    if (!dependency) {
      throw new Error(`Dependency with token ${String(token)} not found`);
    }

    return dependency as DependencyMap[Key];
  }
}

export const container = Container.getInstance();
