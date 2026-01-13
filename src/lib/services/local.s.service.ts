export class LocalStorageService {
  static set<T>(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  static get<T = string>(key: string) {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key) as T | null;
  }
}
