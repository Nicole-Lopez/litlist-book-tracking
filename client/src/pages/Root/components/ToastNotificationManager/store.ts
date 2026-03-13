import type { ToastNotification } from '@models/feedback.models'

let toastQueue: ToastNotification[] = []
const listeners = new Set<CallableFunction>()

const getSnapshot = (): ToastNotification[] => toastQueue

const subscribe = (listener: CallableFunction): (() => boolean) => {
	listeners.add(listener)
	return () => listeners.delete(listener)
}

const notifyListeners = (): void => {
	listeners.forEach(callback => callback())
}

const addToast = (newToast: ToastNotification): void => {
	const isToastExists = toastQueue.some(toast => toast.id === newToast.id)
	if (!isToastExists) {
		toastQueue = [newToast, ...toastQueue]
		notifyListeners()
	}
}

const deleteToast = (id: string): void => {
	toastQueue = toastQueue.filter(toast => toast.id !== id)
	notifyListeners()
}

export default {
	getSnapshot,
	subscribe,
	addToast,
	deleteToast,
}
