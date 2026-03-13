import alertBannerStore from '@pages/Root/components/AlertBannerManager/store'
import toastStore from '@pages/Root/components/ToastNotificationManager/store'
import type { AlertBanner, ToastNotification } from '@models/feedback.models'

export const showAlertBanner = (alertBanner: AlertBanner): void => {
	alertBannerStore.addBanner(alertBanner)
}

export const removeAlertBanner = (id: AlertBanner['id']): void => {
	alertBannerStore.deleteBanner(id)
}

export const showToastNotification = (toast: ToastNotification): void => {
	toastStore.addToast(toast)
}

export const removeToastNotification = (id: ToastNotification['id']): void => {
	toastStore.deleteToast(id)
}
