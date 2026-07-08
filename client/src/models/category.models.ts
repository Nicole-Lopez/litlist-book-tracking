import type { CATEGORIES } from '@constants/category.constants'
import type { ValueOf } from '@customTypes/customUtilityTypes'

export type Category = ValueOf<typeof CATEGORIES>
