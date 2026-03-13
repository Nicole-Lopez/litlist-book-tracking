import type { AlertBanner } from '@models/feedback.models'

let bannerQueue: AlertBanner[] = []
const listeners = new Set<CallableFunction>()

const getSnapshot = (): AlertBanner[] => bannerQueue

const subscribe = (listener: CallableFunction): (() => boolean) => {
	listeners.add(listener)
	return () => listeners.delete(listener)
}

const notifyListeners = (): void => {
	listeners.forEach(callback => callback())
}

const addBanner = (newBanner: AlertBanner): void => {
	const isBannerExists = bannerQueue.some(banner => banner.id === newBanner.id)

	if (!isBannerExists) {
		bannerQueue = [...bannerQueue, newBanner]
		notifyListeners()
	}
}

const deleteBanner = (id: string): void => {
	bannerQueue = bannerQueue.filter(banner => banner.id !== id)
	notifyListeners()
}

export default {
	getSnapshot,
	subscribe,
	addBanner,
	deleteBanner,
}
