export class LocalStorageService {
  static set<T>(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  static get<T = string>(key: string) {
    return localStorage.getItem(key) as T | null;
  }
}
