import { encryptAES, decryptAES } from './crypto'

/**
 * 本地存储工具类
 */
class StorageUtil {
  /**
   * 存储数据到localStorage
   * @param key 存储键名
   * @param value 存储值
   * @param isEncrypt 是否加密存储
   */
  static setLocal(key: string, value: any, isEncrypt: boolean = false): void {
    const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value)

    if (isEncrypt) {
      localStorage.setItem(key, encryptAES(valueStr))
    } else {
      localStorage.setItem(key, valueStr)
    }
  }

  /**
   * 从localStorage获取数据
   * @param key 存储键名
   * @param isEncrypt 是否为加密数据
   * @param defaultValue 默认值，当获取不到数据时返回
   */
  static getLocal<T = any>(key: string, isEncrypt: boolean = false, defaultValue?: T): T | null {
    const value = localStorage.getItem(key)

    if (value === null) {
      return defaultValue !== undefined ? defaultValue : null
    }

    try {
      const decryptedValue = isEncrypt ? decryptAES(value) : value
      const parsedValue = JSON.parse(decryptedValue)
      return parsedValue as T
    } catch (e) {
      // 如果JSON解析失败，返回原始字符串
      return (isEncrypt ? decryptAES(value) : value) as unknown as T
    }
  }

  /**
   * 存储数据到sessionStorage
   * @param key 存储键名
   * @param value 存储值
   * @param isEncrypt 是否加密存储
   */
  static setSession(key: string, value: any, isEncrypt: boolean = false): void {
    const valueStr = typeof value === 'object' ? JSON.stringify(value) : String(value)

    if (isEncrypt) {
      sessionStorage.setItem(key, encryptAES(valueStr))
    } else {
      sessionStorage.setItem(key, valueStr)
    }
  }

  /**
   * 从sessionStorage获取数据
   * @param key 存储键名
   * @param isEncrypt 是否为加密数据
   * @param defaultValue 默认值，当获取不到数据时返回
   */
  static getSession<T = any>(key: string, isEncrypt: boolean = false, defaultValue?: T): T | null {
    const value = sessionStorage.getItem(key)

    if (value === null) {
      return defaultValue !== undefined ? defaultValue : null
    }

    try {
      const decryptedValue = isEncrypt ? decryptAES(value) : value
      const parsedValue = JSON.parse(decryptedValue)
      return parsedValue as T
    } catch (e) {
      // 如果JSON解析失败，返回原始字符串
      return (isEncrypt ? decryptAES(value) : value) as unknown as T
    }
  }

  /**
   * 从localStorage移除指定数据
   * @param key 存储键名
   */
  static removeLocal(key: string): void {
    localStorage.removeItem(key)
  }

  /**
   * 从sessionStorage移除指定数据
   * @param key 存储键名
   */
  static removeSession(key: string): void {
    sessionStorage.removeItem(key)
  }

  /**
   * 清空localStorage所有数据
   */
  static clearLocal(): void {
    localStorage.clear()
  }

  /**
   * 清空sessionStorage所有数据
   */
  static clearSession(): void {
    sessionStorage.clear()
  }
}

// 添加初始化方法，挂载到window对象
export function initGlobalStorage(): void {
  window.LStorage = StorageUtil
  console.log('StorageUtil已挂载到window.storage')
}

// 默认导出，保持原有用法的兼容性
export default StorageUtil
