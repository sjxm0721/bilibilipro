/**
 * 获取本地存储
 * @param key 键
 * @returns 值
 */
export function localGet(key: string): any {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
}

/**
 * 设置本地存储
 * @param key 键
 * @param value 值
 */
export function localSet(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 移除本地存储
 * @param key 键
 */
export function localRemove(key: string): void {
  localStorage.removeItem(key);
}

/**
 * 清空本地存储
 */
export function localClear(): void {
  localStorage.clear();
}
