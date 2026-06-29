/**
 * Removes nullable properties (with `null` or `undefined` values) from an object or array.
 * @template T The object or array to remove nullable properties from.
 * @see https://gist.github.com/albertms10/fb5a6d87a97db584086241d5bad74a41
 * @example
 * type A = { a?: string; b: null; c?: number | null };
 * type B = NonNullableCollection<A>;
 * // { a: string; c: number; }
 * @example
 * type A = [string, undefined, number, null];
 * type B = NonNullableCollection<A>;
 * // (string | number)[]
 */
export type NonNullableCollection<T> = T extends (infer U)[]
    ? Exclude<U, null | undefined>[]
    : {
          [K in keyof T as NonNullable<T[K]> extends never ? never : K]-?: Exclude<
              T[K],
              null | undefined
          >
      }

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
 * Makes a subset of properties in a type required.
 *
 * Given a type `T` with optional properties, this utility enforces that the
 * properties specified in `K` become required, while preserving the rest of
 * the type as-is.
 *
 * @template T The base object type.
 * @template K The keys of `T` that should be made required.
 *
 * @example
 * type A = {
 *   id?: string;
 *   name?: string;
 *   age?: number;
 * };
 *
 * type B = WithRequired<A, "id" | "name">;
 * // {
 * //   id: string;
 * //   name: string;
 * //   age?: number;
 * // }
 *
 * @example
 * type User = {
 *   email?: string;
 *   password?: string;
 * };
 *
 * type LoginPayload = WithRequired<User, "email" | "password">;
 * // {
 * //   email: string;
 * //   password: string;
 * // }
 */
export type WithRequired<T, K extends keyof T> = Prettify<
    Omit<T, K> & Required<Pick<T, K>>
>

/**
 * Extracts the element type from an array type.
 *
 * Given an array type `T`, this utility infers and returns the type of its elements.
 * If `T` is not an array, it returns `never`.
 *
 * @template T The array type to extract the element type from.
 *
 * @example
 * type A = string[];
 * type B = ArrayElement<A>;
 * // string
 *
 * @example
 * type A = (number | string)[];
 * type B = ArrayElement<A>;
 * // number | string
 *
 * @example
 * type A = { id: number }[];
 * type B = ArrayElement<A>;
 * // { id: number }
 *
 * @example
 * type A = readonly number[];
 * type B = ArrayElement<A>;
 * // number
 */
export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never

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
