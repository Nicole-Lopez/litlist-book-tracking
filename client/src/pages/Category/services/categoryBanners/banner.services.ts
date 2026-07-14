import { CATEGORIES } from '@constants/category.constants'
import type { Category } from '@models/category.models'

const CATEGORY_BANNER_FILES: Record<Category, string> = {
	[CATEGORIES.art]: 'banner-art.png',
	[CATEGORIES.business]: 'banner-business.png',
	[CATEGORIES.childrens]: 'banner-childrens.png',
	[CATEGORIES.classics]: 'banner-classics.png',
	[CATEGORIES.fantasy]: 'banner-fantasy.png',
	[CATEGORIES.fiction]: 'banner-fiction.png',
	[CATEGORIES.graphicNovelsAndManga]: 'banner-graphic-novels-and-manga.png',
	[CATEGORIES.horror]: 'banner-horror.png',
	[CATEGORIES.lgbtq]: 'banner-lgbtq.png',
	[CATEGORIES.mystery]: 'banner-mystery.png',
	[CATEGORIES.nonFiction]: 'banner-non-fiction.png',
	[CATEGORIES.philosophy]: 'banner-philosophy.png',
	[CATEGORIES.poetry]: 'banner-poetry.png',
	[CATEGORIES.religion]: 'banner-religion.png',
	[CATEGORIES.romance]: 'banner-romance.png',
	[CATEGORIES.scienceFiction]: 'banner-science-fiction.png',
	[CATEGORIES.thriller]: 'banner-thriller.png',
	[CATEGORIES.youngAdult]: 'banner-young-adult.png',
} as const

export const getCategoryBanner = (category: Category): string =>
	`/images/category-banners/${CATEGORY_BANNER_FILES[category]}`
