import type { CATEGORIES } from '@constants/category.constants.js'
import type { ValueOf } from '@customTypes/customUtilityTypes.js'

export type Category = ValueOf<typeof CATEGORIES>
