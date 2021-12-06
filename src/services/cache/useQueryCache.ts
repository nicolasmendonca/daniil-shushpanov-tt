interface DataType<T> {
  [key: string]: T;
}

export class UseQueryCache<T = any> {
  private data: DataType<T>;

  constructor() {
    this.data = {};
  }

  public getFromCache(key: string): T | null {
    if (this.data[key] !== undefined) {
      return this.data[key];
    }
    return null;
  }

  public setToCache(key: string, item: T): T {
    this.data[key] = item;
    return this.data[key];
  }
}
