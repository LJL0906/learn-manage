import { ref } from 'vue'
import type { Ref } from "vue"

/**
 * 扩展Ref类型，添加自定义方法
 */
interface ExtendedRef<T> extends Ref<T> {
  /** 克隆当前数据 */
  clone: () => T
  /** 清空数据 */
  clear: () => void
  /** 清空指定属性 */
  clearProps: (keys: (keyof T)[]) => void
  /** 克隆指定属性 */
  cloneProps: <K extends keyof T>(keys: K[]) => Pick<T, K>
  /** 重置为初始状态 */
  reset: () => void
  /** 设置新值 */
  setValue: (newValue: T) => void
}

/**
 * 深度克隆函数
 */
function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T
  }

  const result = {} as T
  Object.keys(obj as object).forEach(key => {
    (result as any)[key] = deepClone((obj as any)[key])
  })

  return result
}

/**
 * 获取类型对应的空值
 */
function getEmptyValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return [] as unknown as T
  }

  if (typeof value === 'object' && value !== null) {
    return {} as T
  }

  switch (typeof value) {
    case 'string': return '' as unknown as T
    case 'number': return 0 as unknown as T
    case 'boolean': return false as unknown as T
    default: return undefined as unknown as T
  }
}

/**
 * 封装ref声明的数据,添加自定义方法
 * 1. 通过ref声明数据
 * 2. 添加克隆方法
 * 3. 添加清空方法
 * 4. 添加清空指定属性方法
 * 5. 添加克隆指定属性方法
 * @param data 
 * @returns data
 */
function useRef<T>(data: T): ExtendedRef<T> {
  // 保存初始数据的深拷贝
  const initialData = deepClone(data)
  const refData = ref(data) as Ref<T> as ExtendedRef<T>

  // 添加克隆方法
  refData.clone = () => {
    return deepClone(refData.value)
  }

  // 添加重置方法
  refData.reset = () => {
    refData.value = deepClone(initialData)
  }

  // 添加设置新值方法
  refData.setValue = (newValue: T) => {
    refData.value = deepClone(newValue)
  }

  // 添加清空方法
  refData.clear = () => {
    if (Array.isArray(refData.value)) {
      (refData.value as any).length = 0
    } else if (typeof refData.value === 'object' && refData.value !== null) {
      for (const key in refData.value) {
        if (Object.prototype.hasOwnProperty.call(refData.value, key)) {
          delete (refData.value as any)[key]
        }
      }
    } else {
      refData.value = getEmptyValue(data)
    }
  }

  // 添加清空指定属性方法
  refData.clearProps = (keys: (keyof T)[]) => {
    if (typeof refData.value === 'object' && refData.value !== null) {
      keys.forEach(key => {
        if (key in (refData.value as ExtendedRef<T>)) {
          const originalValue = (refData.value as any)[key];
          (refData.value as any)[key] = getEmptyValue(originalValue)
        }
      })
    }
  }

  // 添加克隆指定属性方法
  refData.cloneProps = <K extends keyof T>(keys: K[]): Pick<T, K> => {
    const result = {} as Pick<T, K>

    if (typeof refData.value === 'object' && refData.value !== null) {
      keys.forEach(key => {
        if (key in (refData.value as ExtendedRef<T>)) {
          (result as any)[key] = deepClone((refData.value as any)[key])
        }
      })
    }

    return result
  }

  return refData
}

export default useRef