import { toast } from 'react-toastify'
import { useCallback } from 'react'
import { ToastOptions } from 'react-toastify/dist/types'

const options: ToastOptions = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export const useToast = () => {
  const showToast = useCallback(
    ({ message, type }: { message: string; type: 'success' | 'error' }) => {
      return type === 'success'
        ? toast.success(message, options)
        : toast.error(message, options)
    },
    []
  )
  return [showToast]
}
