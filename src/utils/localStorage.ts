const localStorageUtil = {
  set: <T>(key: string, value: T): void => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`儲存 ${key} 到 localStorage 失敗:`, error);
    }
  },

  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`讀取 ${key} 從 localStorage 失敗:`, error);
      return defaultValue;
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`移除 ${key} 從 localStorage 失敗:`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("清除 localStorage 失敗:", error);
    }
  },

  has: (key: string): boolean => {
    return localStorage.getItem(key) !== null;
  },
};

export default localStorageUtil;
