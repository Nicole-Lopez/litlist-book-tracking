export interface SearchGoogleBooksAPI {
	kind?: string
	totalItems?: number
	items?: Item[]
}

export interface Item {
	kind?: string
	id: string
	etag?: string
	selfLink?: string
	volumeInfo: VolumeInfo
	saleInfo?: SaleInfo
	accessInfo?: AccessInfo
	searchInfo?: SearchInfo
}

export interface AccessInfo {
	country?: string
	viewability?: string
	embeddable?: boolean
	publicDomain?: boolean
	textToSpeechPermission?: string
	epub?: EpubPdf
	pdf?: EpubPdf
	webReaderLink?: string
	accessViewStatus?: string
	quoteSharingAllowed?: boolean
}

export interface EpubPdf {
	isAvailable?: boolean
	downloadLink?: string
	acsTokenLink?: string
}

export interface SaleInfo {
	country?: string
	saleability?: string
	isEbook?: boolean
	buyLink?: string
	listPrice?: SaleInfoListPrice
	retailPrice?: SaleInfoListPrice
	offers?: Offer[]
}

export interface SaleInfoListPrice {
	amount?: number
	currencyCode?: string
}

export interface Offer {
	finskyOfferType?: number
	listPrice?: OfferListPrice
	retailPrice?: OfferListPrice
}

export interface OfferListPrice {
	amountInMicros?: number
	currencyCode?: string
}

export interface SearchInfo {
	textSnippet?: string
}

export interface VolumeInfo {
	title: string
	authors?: string[]
	publisher?: string
	publishedDate?: string
	description?: string
	industryIdentifiers?: IndustryIdentifier[]
	readingModes?: ReadingModes
	pageCount?: number
	subtitle?: string
	canonicalVolumeLink?: string
	averageRating?: number
	ratingsCount?: number
	language?: string
	previewLink?: string
	infoLink?: string
	imageLinks?: ImageLinks
	allowAnonLogging?: boolean
	contentVersion?: string
	panelizationSummary?: PanelizationSummary
	categories?: string[]
	printType?: string
	maturityRating?: string
}

export interface VolumeInfoDetail extends VolumeInfo {
	printedPageCount?: number
}

export interface ImageLinks {
	smallThumbnail?: string
	thumbnail?: string
	small?: string
	medium?: string
	large?: string
	extraLarge?: string
}

export interface IndustryIdentifier {
	type?: string
	identifier: string
}

export interface PanelizationSummary {
	containsEpubBubbles?: boolean
	containsImageBubbles?: boolean
}

export interface ReadingModes {
	text?: boolean
	image?: boolean
}

export interface DetailGoogleBooksAPI {
	kind?: string
	id?: string
	etag?: string
	selfLink?: string
	volumeInfo?: VolumeInfoDetail
	layerInfo?: LayerInfo
	saleInfo?: SaleInfo
	accessInfo?: AccessInfo
}

export interface LayerInfo {
	layers?: Layer[]
}

export interface Layer {
	layerId?: string
	volumeAnnotationsVersion?: string
}
