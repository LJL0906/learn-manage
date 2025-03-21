import StorageUtil from '../utils/storage'

declare global {
  interface Window {
    LStorage: typeof StorageUtil
  }
}
