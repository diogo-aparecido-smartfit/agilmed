import { DependencyMap } from "./maps";
import { setupDependencies } from "./registry";

class Container {
  private dependencies: Map<string, any> = new Map();
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

  register<K extends keyof DependencyMap>(
    token: K,
    dependency: DependencyMap[K]
  ): void {
    this.dependencies.set(token as string, dependency);
    this.initialized = true;
  }

  resolve<Key extends keyof DependencyMap>(token: Key): DependencyMap[Key] {
    this.initializeDependencies();

    if (!this.initialized) {
      throw new Error(
        "Container not initialized. Make sure setupDependencies() is called before accessing services."
      );
    }

    const dependency = this.dependencies.get(token as string);

    if (!dependency) {
      throw new Error(`Dependency with token ${String(token)} not found`);
    }

    return dependency as DependencyMap[Key];
  }
}

export const container = Container.getInstance();
