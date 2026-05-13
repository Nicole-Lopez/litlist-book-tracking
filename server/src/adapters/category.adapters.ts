import { CATEGORIES } from '@constants/category.constants.js'
import { GqlCategory } from '@gqlTypes'
import type { Category } from '@models/category.models.js'

export const GQL_CATEGORY_TO_CATEGORY: Readonly<Record<GqlCategory, Category>> = {
	[GqlCategory.Art]: CATEGORIES.art,
	[GqlCategory.Business]: CATEGORIES.business,
	[GqlCategory.Childrens]: CATEGORIES.childrens,
	[GqlCategory.Classics]: CATEGORIES.classics,
	[GqlCategory.Fantasy]: CATEGORIES.fantasy,
	[GqlCategory.Fiction]: CATEGORIES.fiction,
	[GqlCategory.GraphicBooksAndManga]: CATEGORIES.graphicBooksAndManga,
	[GqlCategory.Horror]: CATEGORIES.horror,
	[GqlCategory.Lgbtq]: CATEGORIES.lgbtq,
	[GqlCategory.Mystery]: CATEGORIES.mystery,
	[GqlCategory.NonFiction]: CATEGORIES.nonFiction,
	[GqlCategory.Philosophy]: CATEGORIES.philosophy,
	[GqlCategory.Poetry]: CATEGORIES.poetry,
	[GqlCategory.Religion]: CATEGORIES.religion,
	[GqlCategory.Romance]: CATEGORIES.romance,
	[GqlCategory.ScienceFiction]: CATEGORIES.scienceFiction,
	[GqlCategory.Thriller]: CATEGORIES.thriller,
	[GqlCategory.YoungAdult]: CATEGORIES.youngAdult,
}
