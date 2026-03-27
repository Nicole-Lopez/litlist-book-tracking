import type { NonNullableCollection } from '@customTypes/customUtilityTypes'

export const removeEmptyValues = <ObjT extends Record<string, unknown>>(
	obj: ObjT,
): NonNullableCollection<ObjT> => {
	return Object.fromEntries(
		Object.entries(obj).filter(
			([_, value]) =>
				value !== undefined &&
				value !== null &&
				value !== '' &&
				!(Array.isArray(value) && value.length === 0),
		),
	) as NonNullableCollection<ObjT>
}
