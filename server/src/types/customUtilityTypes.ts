/**
 * Creates a union type from the values of an object type.
 *
 * Given an object type `T`, this utility extracts all its property value types
 * and combines them into a union.
 *
 * @template T The object type to extract values from.
 *
 * @example
 * const obj = {
 *   a: "hello",
 *   b: 42,
 *   c: true
 * } as const;
 *
 * type Values = ValueOf<typeof obj>;
 * // "hello" | 42 | true
 *
 * @example
 * type A = {
 *   foo: string;
 *   bar: number;
 * };
 *
 * type B = ValueOf<A>;
 * // string | number
 */
export type ValueOf<T> = T[keyof T]

/**
 * Flattens and simplifies a type for better readability in editor tooltips.
 *
 * This utility is commonly used to "prettify" complex or deeply nested types,
 * especially those produced by intersections (`&`) or mapped types, by forcing
 * TypeScript to re-evaluate and display them as a single, expanded object type.
 *
 * It does not change the actual structure or behavior of the type—only how it
 * is presented by the TypeScript compiler.
 *
 * @template T The type to simplify for display purposes.
 *
 * @see https://www.totaltypescript.com/concepts/the-prettify-helper
 *
 * @example
 * type A = { a: string } & { b: number };
 * type B = Prettify<A>;
 * // { a: string; b: number }
 *
 * @example
 * type A = {
 *   a: string;
 *   b: number;
 * } & {
 *   c: boolean;
 * };
 *
 * type B = Prettify<A>;
 * // { a: string; b: number; c: boolean }
 */
export type Prettify<T> = {
    [K in keyof T]: T[K]
} & {}

/**
 * Makes all properties in a type nullable.
 *
 * Given a type `T`, this utility transforms each of its properties so that
 * they can also be `null`, while preserving their original types.
 *
 * @template T The base object type.
 *
 * @example
 * type A = {
 *   id: string;
 *   name: string;
 * };
 *
 * type B = NullableProperties<A>;
 * // {
 * //   id: string | null;
 * //   name: string | null;
 * // }
 *
 * @example
 * type User = {
 *   email: string;
 *   age?: number;
 * };
 *
 * type NullableUser = NullableProperties<User>;
 * // {
 * //   email: string | null;
 * //   age?: number | null;
 * // }
 */
export type NullableProperties<T> = { [K in keyof T]: T[K] | null }
