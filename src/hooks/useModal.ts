import { ref, type Ref } from 'vue'

interface UseDialogOptions<TOpen = unknown, TClose = unknown, TReset = unknown> {
  show?: boolean // 是否显示对话框
  onOpen?: (args?: TOpen) => void
  onClose?: (args?: TClose) => Promise<void> | void
  onReset?: (args?: TReset) => void
  resetOnClose?: boolean // 在关闭时是否自动重置
}

interface UseDialogReturn<TOpen = unknown, TClose = unknown, TReset = unknown> {
  isShow: Ref<boolean>
  open: (args?: TOpen) => void
  close: (args?: TClose) => Promise<void>
  reset: (args?: TReset) => void
}

function useDialog<TOpen = unknown, TClose = unknown, TReset = unknown>(
  { show = false, onOpen, onClose, onReset, resetOnClose = true }: UseDialogOptions<TOpen, TClose, TReset> = {}
): UseDialogReturn<TOpen, TClose, TReset> {
  const isShow = ref<boolean>(show)

  // 打开对话框，可以传递参数
  const open = (args?: TOpen) => {
    isShow.value = true
    if (typeof onOpen === 'function') {
      onOpen(args)
    }
  }

  // 重置对话框，可以传递参数
  const reset = (args?: TReset) => {
    if (typeof onReset === 'function') {
      onReset(args)
    }
    isShow.value = false
  }

  // 关闭对话框，并支持异步关闭，可以传递参数
  const close = async (args?: TClose) => {
    if (typeof onClose === 'function') {
      await onClose(args)
    }
    isShow.value = false
    if (resetOnClose) {
      reset() // 关闭后自动重置
    }
  }

  return {
    isShow,
    open,
    close,
    reset
  }
}

export default useDialog
