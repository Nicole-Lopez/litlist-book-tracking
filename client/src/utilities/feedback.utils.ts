import toastStore from '@pages/Root/components/ToastNotificationManager/store'
import type { Toast } from '@models/feedback.models'

export const showToast = (toast: Toast): void => {
	toastStore.addToast(toast)
}

export const removeToast = (id: Toast['id']): void => {
	toastStore.deleteToast(id)
}
