import type { NonNullableCollection, Prettify } from '@customTypes/customUtilityTypes'

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

export const removeNullish = <ObjT extends Record<string, unknown>>(
	obj: ObjT,
): NonNullableCollection<ObjT> => {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined),
	) as NonNullableCollection<ObjT>
}

export const mapValues = <ObjT extends Record<string, unknown>, ValueT>(
	obj: ObjT,
	onValueGenerated: (value: ObjT[keyof ObjT], key: keyof ObjT) => ValueT,
): Prettify<Record<keyof ObjT, ValueT>> => {
	const result = {} as Record<keyof ObjT, ValueT>

	for (const key in obj) {
		result[key] = onValueGenerated(obj[key], key)
	}

	return result
}

export const generateKeyMirror = <ObjT extends Record<string, unknown>>(
	obj: ObjT,
): { [K in keyof ObjT]: K } => mapValues(obj, (_, key) => key) as { [K in keyof ObjT]: K }
