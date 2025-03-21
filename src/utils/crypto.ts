import CryptoJS from 'crypto-js'

// 默认密钥和IV - 仅供参考，生产环境建议使用随机生成的值
const DEFAULT_KEY = 'XA8s7d9Z3F4h5T6g'
const DEFAULT_IV = 'P1l2M3n4B5v6C7x8'

/**
 * 生成指定长度的随机字符串作为密钥
 * @param length 密钥长度
 * @returns 随机生成的密钥
 */
function generateRandomKey(length: number = 16): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

/**
 * AES加密方法
 * @param data 要加密的数据
 * @param customKey 自定义密钥（可选）
 * @param customIv 自定义IV（可选）
 * @returns 加密后的字符串
 */
function encryptAES(data: string, customKey?: string, customIv?: string): string {
  const key = CryptoJS.enc.Utf8.parse(customKey || DEFAULT_KEY)
  const iv = CryptoJS.enc.Utf8.parse(customIv || DEFAULT_IV)
  const dataHex = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(dataHex, key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  )
  return encrypted.ciphertext.toString().toUpperCase()
}

/**
 * AES解密方法
 * @param data 要解密的数据
 * @param customKey 自定义密钥（可选）
 * @param customIv 自定义IV（可选）
 * @returns 解密后的字符串
 */
function decryptAES(data: string, customKey?: string, customIv?: string): string {
  const key = CryptoJS.enc.Utf8.parse(customKey || DEFAULT_KEY)
  const iv = CryptoJS.enc.Utf8.parse(customIv || DEFAULT_IV)
  const encryptedData = CryptoJS.enc.Hex.parse(data) // 十六进制字符串
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: encryptedData
  })
  const decrypted = CryptoJS.AES.decrypt(
    cipherParams,
    key,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }
  )

  return decrypted.toString(CryptoJS.enc.Utf8) // 转换为UTF-8字符串
}

// 导出函数和常量
export {
  encryptAES,
  decryptAES,
  generateRandomKey,
  DEFAULT_KEY,
  DEFAULT_IV
}