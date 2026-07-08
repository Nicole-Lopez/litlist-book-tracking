import { CATEGORIES } from '@constants/category.constants'
import { GqlCategory } from './generated/enums.generated'
import type { Category } from '@models/category.models'

export const CATEGORY_TO_API_CATEGORY: Readonly<Record<Category, GqlCategory>> = {
	[CATEGORIES.art]: GqlCategory.GqlArt,
	[CATEGORIES.business]: GqlCategory.GqlBusiness,
	[CATEGORIES.childrens]: GqlCategory.GqlChildrens,
	[CATEGORIES.classics]: GqlCategory.GqlClassics,
	[CATEGORIES.fantasy]: GqlCategory.GqlFantasy,
	[CATEGORIES.fiction]: GqlCategory.GqlFiction,
	[CATEGORIES.graphicBooksAndManga]: GqlCategory.GqlGraphicBooksAndManga,
	[CATEGORIES.horror]: GqlCategory.GqlHorror,
	[CATEGORIES.lgbtq]: GqlCategory.GqlLgbtq,
	[CATEGORIES.mystery]: GqlCategory.GqlMystery,
	[CATEGORIES.nonFiction]: GqlCategory.GqlNonFiction,
	[CATEGORIES.philosophy]: GqlCategory.GqlPhilosophy,
	[CATEGORIES.poetry]: GqlCategory.GqlPoetry,
	[CATEGORIES.religion]: GqlCategory.GqlReligion,
	[CATEGORIES.romance]: GqlCategory.GqlRomance,
	[CATEGORIES.scienceFiction]: GqlCategory.GqlScienceFiction,
	[CATEGORIES.thriller]: GqlCategory.GqlThriller,
	[CATEGORIES.youngAdult]: GqlCategory.GqlYoungAdult,
}
