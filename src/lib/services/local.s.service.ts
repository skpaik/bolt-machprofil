export class LocalStorageService {
  static set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static get<T = string>(key: string) {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key) as T | null;
  }
}
