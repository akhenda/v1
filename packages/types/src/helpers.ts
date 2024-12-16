/**
 * Converts an object into an array of its values
 */
export type ObjectValues<T> = T[keyof T];

/**
 * Extracts the contravariant type
 *
 * biome-ignore lint/suspicious/noExplicitAny: this is intentional
 */
type Contra<T> = T extends any ? (arg: T) => void : never;

/**
 * Infer the contravariant type
 */
type InferContra<T> = [T] extends [(arg: infer I) => void] ? I : never;

/**
 * Pick one of the contravariant types
 *
 * https://www.hacklewayne.com/typescript-convert-union-to-tuple-array-yes-but-how
 */
type PickOne<T> = InferContra<InferContra<Contra<Contra<T>>>>;

/**
 * Extracts the element type of an array
 */
export type Union2Tuple<T> = PickOne<T> extends infer U // assign PickOne<T> to U
  ? Exclude<T, U> extends never // T and U are the same
    ? [T]
    : [...Union2Tuple<Exclude<T, U>>, U] // recursion
  : never;

/**
 * Prettifies a type
 *
 * https://www.youtube.com/watch?v=2lCCKiWGlC0
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
