import alertBannerStore from '@pages/Root/components/AlertBannerManager/store'
import toastStore from '@pages/Root/components/ToastNotificationManager/store'
import type { AlertBanner, Toast } from '@models/feedback.models'

export const showAlertBanner = (alertBanner: AlertBanner): void => {
	alertBannerStore.addBanner(alertBanner)
}

export const removeAlertBanner = (id: AlertBanner['id']): void => {
	alertBannerStore.deleteBanner(id)
}

export const showToast = (toast: Toast): void => {
	toastStore.addToast(toast)
}

export const removeToast = (id: Toast['id']): void => {
	toastStore.deleteToast(id)
}
