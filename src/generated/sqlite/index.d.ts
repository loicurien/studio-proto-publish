
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Publication
 * 
 */
export type Publication = $Result.DefaultSelection<Prisma.$PublicationPayload>
/**
 * Model Distribution
 * 
 */
export type Distribution = $Result.DefaultSelection<Prisma.$DistributionPayload>
/**
 * Model AyrshareProfile
 * 
 */
export type AyrshareProfile = $Result.DefaultSelection<Prisma.$AyrshareProfilePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Publications
 * const publications = await prisma.publication.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Publications
   * const publications = await prisma.publication.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.publication`: Exposes CRUD operations for the **Publication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Publications
    * const publications = await prisma.publication.findMany()
    * ```
    */
  get publication(): Prisma.PublicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.distribution`: Exposes CRUD operations for the **Distribution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Distributions
    * const distributions = await prisma.distribution.findMany()
    * ```
    */
  get distribution(): Prisma.DistributionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ayrshareProfile`: Exposes CRUD operations for the **AyrshareProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AyrshareProfiles
    * const ayrshareProfiles = await prisma.ayrshareProfile.findMany()
    * ```
    */
  get ayrshareProfile(): Prisma.AyrshareProfileDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Publication: 'Publication',
    Distribution: 'Distribution',
    AyrshareProfile: 'AyrshareProfile'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "publication" | "distribution" | "ayrshareProfile"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Publication: {
        payload: Prisma.$PublicationPayload<ExtArgs>
        fields: Prisma.PublicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PublicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PublicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          findFirst: {
            args: Prisma.PublicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PublicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          findMany: {
            args: Prisma.PublicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>[]
          }
          create: {
            args: Prisma.PublicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          createMany: {
            args: Prisma.PublicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PublicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>[]
          }
          delete: {
            args: Prisma.PublicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          update: {
            args: Prisma.PublicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          deleteMany: {
            args: Prisma.PublicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PublicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PublicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>[]
          }
          upsert: {
            args: Prisma.PublicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          aggregate: {
            args: Prisma.PublicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublication>
          }
          groupBy: {
            args: Prisma.PublicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PublicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PublicationCountArgs<ExtArgs>
            result: $Utils.Optional<PublicationCountAggregateOutputType> | number
          }
        }
      }
      Distribution: {
        payload: Prisma.$DistributionPayload<ExtArgs>
        fields: Prisma.DistributionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DistributionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DistributionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionPayload>
          }
          findFirst: {
            args: Prisma.DistributionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DistributionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionPayload>
          }
          findMany: {
            args: Prisma.DistributionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionPayload>[]
          }
          create: {
            args: Prisma.DistributionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionPayload>
          }
          createMany: {
            args: Prisma.DistributionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DistributionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionPayload>[]
          }
          delete: {
            args: Prisma.DistributionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionPayload>
          }
          update: {
            args: Prisma.DistributionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionPayload>
          }
          deleteMany: {
            args: Prisma.DistributionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DistributionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DistributionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionPayload>[]
          }
          upsert: {
            args: Prisma.DistributionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DistributionPayload>
          }
          aggregate: {
            args: Prisma.DistributionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDistribution>
          }
          groupBy: {
            args: Prisma.DistributionGroupByArgs<ExtArgs>
            result: $Utils.Optional<DistributionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DistributionCountArgs<ExtArgs>
            result: $Utils.Optional<DistributionCountAggregateOutputType> | number
          }
        }
      }
      AyrshareProfile: {
        payload: Prisma.$AyrshareProfilePayload<ExtArgs>
        fields: Prisma.AyrshareProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AyrshareProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AyrshareProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AyrshareProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AyrshareProfilePayload>
          }
          findFirst: {
            args: Prisma.AyrshareProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AyrshareProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AyrshareProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AyrshareProfilePayload>
          }
          findMany: {
            args: Prisma.AyrshareProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AyrshareProfilePayload>[]
          }
          create: {
            args: Prisma.AyrshareProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AyrshareProfilePayload>
          }
          createMany: {
            args: Prisma.AyrshareProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AyrshareProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AyrshareProfilePayload>[]
          }
          delete: {
            args: Prisma.AyrshareProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AyrshareProfilePayload>
          }
          update: {
            args: Prisma.AyrshareProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AyrshareProfilePayload>
          }
          deleteMany: {
            args: Prisma.AyrshareProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AyrshareProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AyrshareProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AyrshareProfilePayload>[]
          }
          upsert: {
            args: Prisma.AyrshareProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AyrshareProfilePayload>
          }
          aggregate: {
            args: Prisma.AyrshareProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAyrshareProfile>
          }
          groupBy: {
            args: Prisma.AyrshareProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<AyrshareProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.AyrshareProfileCountArgs<ExtArgs>
            result: $Utils.Optional<AyrshareProfileCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    publication?: PublicationOmit
    distribution?: DistributionOmit
    ayrshareProfile?: AyrshareProfileOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PublicationCountOutputType
   */

  export type PublicationCountOutputType = {
    distributions: number
  }

  export type PublicationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    distributions?: boolean | PublicationCountOutputTypeCountDistributionsArgs
  }

  // Custom InputTypes
  /**
   * PublicationCountOutputType without action
   */
  export type PublicationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PublicationCountOutputType
     */
    select?: PublicationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PublicationCountOutputType without action
   */
  export type PublicationCountOutputTypeCountDistributionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DistributionWhereInput
  }


  /**
   * Count Type AyrshareProfileCountOutputType
   */

  export type AyrshareProfileCountOutputType = {
    publications: number
  }

  export type AyrshareProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publications?: boolean | AyrshareProfileCountOutputTypeCountPublicationsArgs
  }

  // Custom InputTypes
  /**
   * AyrshareProfileCountOutputType without action
   */
  export type AyrshareProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfileCountOutputType
     */
    select?: AyrshareProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AyrshareProfileCountOutputType without action
   */
  export type AyrshareProfileCountOutputTypeCountPublicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Publication
   */

  export type AggregatePublication = {
    _count: PublicationCountAggregateOutputType | null
    _min: PublicationMinAggregateOutputType | null
    _max: PublicationMaxAggregateOutputType | null
  }

  export type PublicationMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    postText: string | null
    mediaUrls: string | null
    mediaUrlsByFormat: string | null
    scheduledAt: Date | null
    ayrshareProfileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PublicationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    postText: string | null
    mediaUrls: string | null
    mediaUrlsByFormat: string | null
    scheduledAt: Date | null
    ayrshareProfileId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PublicationCountAggregateOutputType = {
    id: number
    title: number
    description: number
    postText: number
    mediaUrls: number
    mediaUrlsByFormat: number
    scheduledAt: number
    ayrshareProfileId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PublicationMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    postText?: true
    mediaUrls?: true
    mediaUrlsByFormat?: true
    scheduledAt?: true
    ayrshareProfileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PublicationMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    postText?: true
    mediaUrls?: true
    mediaUrlsByFormat?: true
    scheduledAt?: true
    ayrshareProfileId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PublicationCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    postText?: true
    mediaUrls?: true
    mediaUrlsByFormat?: true
    scheduledAt?: true
    ayrshareProfileId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PublicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Publication to aggregate.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Publications
    **/
    _count?: true | PublicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PublicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PublicationMaxAggregateInputType
  }

  export type GetPublicationAggregateType<T extends PublicationAggregateArgs> = {
        [P in keyof T & keyof AggregatePublication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublication[P]>
      : GetScalarType<T[P], AggregatePublication[P]>
  }




  export type PublicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicationWhereInput
    orderBy?: PublicationOrderByWithAggregationInput | PublicationOrderByWithAggregationInput[]
    by: PublicationScalarFieldEnum[] | PublicationScalarFieldEnum
    having?: PublicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PublicationCountAggregateInputType | true
    _min?: PublicationMinAggregateInputType
    _max?: PublicationMaxAggregateInputType
  }

  export type PublicationGroupByOutputType = {
    id: string
    title: string
    description: string | null
    postText: string | null
    mediaUrls: string | null
    mediaUrlsByFormat: string | null
    scheduledAt: Date | null
    ayrshareProfileId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PublicationCountAggregateOutputType | null
    _min: PublicationMinAggregateOutputType | null
    _max: PublicationMaxAggregateOutputType | null
  }

  type GetPublicationGroupByPayload<T extends PublicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PublicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PublicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PublicationGroupByOutputType[P]>
            : GetScalarType<T[P], PublicationGroupByOutputType[P]>
        }
      >
    >


  export type PublicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    postText?: boolean
    mediaUrls?: boolean
    mediaUrlsByFormat?: boolean
    scheduledAt?: boolean
    ayrshareProfileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    distributions?: boolean | Publication$distributionsArgs<ExtArgs>
    ayrshareProfile?: boolean | Publication$ayrshareProfileArgs<ExtArgs>
    _count?: boolean | PublicationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["publication"]>

  export type PublicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    postText?: boolean
    mediaUrls?: boolean
    mediaUrlsByFormat?: boolean
    scheduledAt?: boolean
    ayrshareProfileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ayrshareProfile?: boolean | Publication$ayrshareProfileArgs<ExtArgs>
  }, ExtArgs["result"]["publication"]>

  export type PublicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    postText?: boolean
    mediaUrls?: boolean
    mediaUrlsByFormat?: boolean
    scheduledAt?: boolean
    ayrshareProfileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ayrshareProfile?: boolean | Publication$ayrshareProfileArgs<ExtArgs>
  }, ExtArgs["result"]["publication"]>

  export type PublicationSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    postText?: boolean
    mediaUrls?: boolean
    mediaUrlsByFormat?: boolean
    scheduledAt?: boolean
    ayrshareProfileId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PublicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "postText" | "mediaUrls" | "mediaUrlsByFormat" | "scheduledAt" | "ayrshareProfileId" | "createdAt" | "updatedAt", ExtArgs["result"]["publication"]>
  export type PublicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    distributions?: boolean | Publication$distributionsArgs<ExtArgs>
    ayrshareProfile?: boolean | Publication$ayrshareProfileArgs<ExtArgs>
    _count?: boolean | PublicationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PublicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ayrshareProfile?: boolean | Publication$ayrshareProfileArgs<ExtArgs>
  }
  export type PublicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ayrshareProfile?: boolean | Publication$ayrshareProfileArgs<ExtArgs>
  }

  export type $PublicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Publication"
    objects: {
      distributions: Prisma.$DistributionPayload<ExtArgs>[]
      ayrshareProfile: Prisma.$AyrshareProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      postText: string | null
      mediaUrls: string | null
      mediaUrlsByFormat: string | null
      scheduledAt: Date | null
      ayrshareProfileId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["publication"]>
    composites: {}
  }

  type PublicationGetPayload<S extends boolean | null | undefined | PublicationDefaultArgs> = $Result.GetResult<Prisma.$PublicationPayload, S>

  type PublicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PublicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PublicationCountAggregateInputType | true
    }

  export interface PublicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Publication'], meta: { name: 'Publication' } }
    /**
     * Find zero or one Publication that matches the filter.
     * @param {PublicationFindUniqueArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PublicationFindUniqueArgs>(args: SelectSubset<T, PublicationFindUniqueArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Publication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PublicationFindUniqueOrThrowArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PublicationFindUniqueOrThrowArgs>(args: SelectSubset<T, PublicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindFirstArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PublicationFindFirstArgs>(args?: SelectSubset<T, PublicationFindFirstArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindFirstOrThrowArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PublicationFindFirstOrThrowArgs>(args?: SelectSubset<T, PublicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Publications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Publications
     * const publications = await prisma.publication.findMany()
     * 
     * // Get first 10 Publications
     * const publications = await prisma.publication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publicationWithIdOnly = await prisma.publication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PublicationFindManyArgs>(args?: SelectSubset<T, PublicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Publication.
     * @param {PublicationCreateArgs} args - Arguments to create a Publication.
     * @example
     * // Create one Publication
     * const Publication = await prisma.publication.create({
     *   data: {
     *     // ... data to create a Publication
     *   }
     * })
     * 
     */
    create<T extends PublicationCreateArgs>(args: SelectSubset<T, PublicationCreateArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Publications.
     * @param {PublicationCreateManyArgs} args - Arguments to create many Publications.
     * @example
     * // Create many Publications
     * const publication = await prisma.publication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PublicationCreateManyArgs>(args?: SelectSubset<T, PublicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Publications and returns the data saved in the database.
     * @param {PublicationCreateManyAndReturnArgs} args - Arguments to create many Publications.
     * @example
     * // Create many Publications
     * const publication = await prisma.publication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Publications and only return the `id`
     * const publicationWithIdOnly = await prisma.publication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PublicationCreateManyAndReturnArgs>(args?: SelectSubset<T, PublicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Publication.
     * @param {PublicationDeleteArgs} args - Arguments to delete one Publication.
     * @example
     * // Delete one Publication
     * const Publication = await prisma.publication.delete({
     *   where: {
     *     // ... filter to delete one Publication
     *   }
     * })
     * 
     */
    delete<T extends PublicationDeleteArgs>(args: SelectSubset<T, PublicationDeleteArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Publication.
     * @param {PublicationUpdateArgs} args - Arguments to update one Publication.
     * @example
     * // Update one Publication
     * const publication = await prisma.publication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PublicationUpdateArgs>(args: SelectSubset<T, PublicationUpdateArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Publications.
     * @param {PublicationDeleteManyArgs} args - Arguments to filter Publications to delete.
     * @example
     * // Delete a few Publications
     * const { count } = await prisma.publication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PublicationDeleteManyArgs>(args?: SelectSubset<T, PublicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Publications
     * const publication = await prisma.publication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PublicationUpdateManyArgs>(args: SelectSubset<T, PublicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Publications and returns the data updated in the database.
     * @param {PublicationUpdateManyAndReturnArgs} args - Arguments to update many Publications.
     * @example
     * // Update many Publications
     * const publication = await prisma.publication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Publications and only return the `id`
     * const publicationWithIdOnly = await prisma.publication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PublicationUpdateManyAndReturnArgs>(args: SelectSubset<T, PublicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Publication.
     * @param {PublicationUpsertArgs} args - Arguments to update or create a Publication.
     * @example
     * // Update or create a Publication
     * const publication = await prisma.publication.upsert({
     *   create: {
     *     // ... data to create a Publication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Publication we want to update
     *   }
     * })
     */
    upsert<T extends PublicationUpsertArgs>(args: SelectSubset<T, PublicationUpsertArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationCountArgs} args - Arguments to filter Publications to count.
     * @example
     * // Count the number of Publications
     * const count = await prisma.publication.count({
     *   where: {
     *     // ... the filter for the Publications we want to count
     *   }
     * })
    **/
    count<T extends PublicationCountArgs>(
      args?: Subset<T, PublicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PublicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Publication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PublicationAggregateArgs>(args: Subset<T, PublicationAggregateArgs>): Prisma.PrismaPromise<GetPublicationAggregateType<T>>

    /**
     * Group by Publication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PublicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PublicationGroupByArgs['orderBy'] }
        : { orderBy?: PublicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PublicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Publication model
   */
  readonly fields: PublicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Publication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PublicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    distributions<T extends Publication$distributionsArgs<ExtArgs> = {}>(args?: Subset<T, Publication$distributionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ayrshareProfile<T extends Publication$ayrshareProfileArgs<ExtArgs> = {}>(args?: Subset<T, Publication$ayrshareProfileArgs<ExtArgs>>): Prisma__AyrshareProfileClient<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Publication model
   */
  interface PublicationFieldRefs {
    readonly id: FieldRef<"Publication", 'String'>
    readonly title: FieldRef<"Publication", 'String'>
    readonly description: FieldRef<"Publication", 'String'>
    readonly postText: FieldRef<"Publication", 'String'>
    readonly mediaUrls: FieldRef<"Publication", 'String'>
    readonly mediaUrlsByFormat: FieldRef<"Publication", 'String'>
    readonly scheduledAt: FieldRef<"Publication", 'DateTime'>
    readonly ayrshareProfileId: FieldRef<"Publication", 'String'>
    readonly createdAt: FieldRef<"Publication", 'DateTime'>
    readonly updatedAt: FieldRef<"Publication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Publication findUnique
   */
  export type PublicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication findUniqueOrThrow
   */
  export type PublicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication findFirst
   */
  export type PublicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Publications.
     */
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication findFirstOrThrow
   */
  export type PublicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Publications.
     */
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication findMany
   */
  export type PublicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter, which Publications to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication create
   */
  export type PublicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * The data needed to create a Publication.
     */
    data: XOR<PublicationCreateInput, PublicationUncheckedCreateInput>
  }

  /**
   * Publication createMany
   */
  export type PublicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Publications.
     */
    data: PublicationCreateManyInput | PublicationCreateManyInput[]
  }

  /**
   * Publication createManyAndReturn
   */
  export type PublicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The data used to create many Publications.
     */
    data: PublicationCreateManyInput | PublicationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Publication update
   */
  export type PublicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * The data needed to update a Publication.
     */
    data: XOR<PublicationUpdateInput, PublicationUncheckedUpdateInput>
    /**
     * Choose, which Publication to update.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication updateMany
   */
  export type PublicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Publications.
     */
    data: XOR<PublicationUpdateManyMutationInput, PublicationUncheckedUpdateManyInput>
    /**
     * Filter which Publications to update
     */
    where?: PublicationWhereInput
    /**
     * Limit how many Publications to update.
     */
    limit?: number
  }

  /**
   * Publication updateManyAndReturn
   */
  export type PublicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The data used to update Publications.
     */
    data: XOR<PublicationUpdateManyMutationInput, PublicationUncheckedUpdateManyInput>
    /**
     * Filter which Publications to update
     */
    where?: PublicationWhereInput
    /**
     * Limit how many Publications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Publication upsert
   */
  export type PublicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * The filter to search for the Publication to update in case it exists.
     */
    where: PublicationWhereUniqueInput
    /**
     * In case the Publication found by the `where` argument doesn't exist, create a new Publication with this data.
     */
    create: XOR<PublicationCreateInput, PublicationUncheckedCreateInput>
    /**
     * In case the Publication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PublicationUpdateInput, PublicationUncheckedUpdateInput>
  }

  /**
   * Publication delete
   */
  export type PublicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    /**
     * Filter which Publication to delete.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication deleteMany
   */
  export type PublicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Publications to delete
     */
    where?: PublicationWhereInput
    /**
     * Limit how many Publications to delete.
     */
    limit?: number
  }

  /**
   * Publication.distributions
   */
  export type Publication$distributionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionInclude<ExtArgs> | null
    where?: DistributionWhereInput
    orderBy?: DistributionOrderByWithRelationInput | DistributionOrderByWithRelationInput[]
    cursor?: DistributionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DistributionScalarFieldEnum | DistributionScalarFieldEnum[]
  }

  /**
   * Publication.ayrshareProfile
   */
  export type Publication$ayrshareProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AyrshareProfileInclude<ExtArgs> | null
    where?: AyrshareProfileWhereInput
  }

  /**
   * Publication without action
   */
  export type PublicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
  }


  /**
   * Model Distribution
   */

  export type AggregateDistribution = {
    _count: DistributionCountAggregateOutputType | null
    _avg: DistributionAvgAggregateOutputType | null
    _sum: DistributionSumAggregateOutputType | null
    _min: DistributionMinAggregateOutputType | null
    _max: DistributionMaxAggregateOutputType | null
  }

  export type DistributionAvgAggregateOutputType = {
    viewCount: number | null
  }

  export type DistributionSumAggregateOutputType = {
    viewCount: number | null
  }

  export type DistributionMinAggregateOutputType = {
    id: string | null
    publicationId: string | null
    platform: string | null
    status: string | null
    ayrsharePostId: string | null
    platformPostId: string | null
    postUrl: string | null
    errorMessage: string | null
    scheduledAt: Date | null
    publishedAt: Date | null
    postText: string | null
    mediaUrls: string | null
    platformOptions: string | null
    hashtags: string | null
    preferredFormat: string | null
    viewCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DistributionMaxAggregateOutputType = {
    id: string | null
    publicationId: string | null
    platform: string | null
    status: string | null
    ayrsharePostId: string | null
    platformPostId: string | null
    postUrl: string | null
    errorMessage: string | null
    scheduledAt: Date | null
    publishedAt: Date | null
    postText: string | null
    mediaUrls: string | null
    platformOptions: string | null
    hashtags: string | null
    preferredFormat: string | null
    viewCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DistributionCountAggregateOutputType = {
    id: number
    publicationId: number
    platform: number
    status: number
    ayrsharePostId: number
    platformPostId: number
    postUrl: number
    errorMessage: number
    scheduledAt: number
    publishedAt: number
    postText: number
    mediaUrls: number
    platformOptions: number
    hashtags: number
    preferredFormat: number
    viewCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DistributionAvgAggregateInputType = {
    viewCount?: true
  }

  export type DistributionSumAggregateInputType = {
    viewCount?: true
  }

  export type DistributionMinAggregateInputType = {
    id?: true
    publicationId?: true
    platform?: true
    status?: true
    ayrsharePostId?: true
    platformPostId?: true
    postUrl?: true
    errorMessage?: true
    scheduledAt?: true
    publishedAt?: true
    postText?: true
    mediaUrls?: true
    platformOptions?: true
    hashtags?: true
    preferredFormat?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DistributionMaxAggregateInputType = {
    id?: true
    publicationId?: true
    platform?: true
    status?: true
    ayrsharePostId?: true
    platformPostId?: true
    postUrl?: true
    errorMessage?: true
    scheduledAt?: true
    publishedAt?: true
    postText?: true
    mediaUrls?: true
    platformOptions?: true
    hashtags?: true
    preferredFormat?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DistributionCountAggregateInputType = {
    id?: true
    publicationId?: true
    platform?: true
    status?: true
    ayrsharePostId?: true
    platformPostId?: true
    postUrl?: true
    errorMessage?: true
    scheduledAt?: true
    publishedAt?: true
    postText?: true
    mediaUrls?: true
    platformOptions?: true
    hashtags?: true
    preferredFormat?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DistributionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Distribution to aggregate.
     */
    where?: DistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Distributions to fetch.
     */
    orderBy?: DistributionOrderByWithRelationInput | DistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Distributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Distributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Distributions
    **/
    _count?: true | DistributionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DistributionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DistributionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DistributionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DistributionMaxAggregateInputType
  }

  export type GetDistributionAggregateType<T extends DistributionAggregateArgs> = {
        [P in keyof T & keyof AggregateDistribution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDistribution[P]>
      : GetScalarType<T[P], AggregateDistribution[P]>
  }




  export type DistributionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DistributionWhereInput
    orderBy?: DistributionOrderByWithAggregationInput | DistributionOrderByWithAggregationInput[]
    by: DistributionScalarFieldEnum[] | DistributionScalarFieldEnum
    having?: DistributionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DistributionCountAggregateInputType | true
    _avg?: DistributionAvgAggregateInputType
    _sum?: DistributionSumAggregateInputType
    _min?: DistributionMinAggregateInputType
    _max?: DistributionMaxAggregateInputType
  }

  export type DistributionGroupByOutputType = {
    id: string
    publicationId: string
    platform: string
    status: string
    ayrsharePostId: string | null
    platformPostId: string | null
    postUrl: string | null
    errorMessage: string | null
    scheduledAt: Date | null
    publishedAt: Date | null
    postText: string | null
    mediaUrls: string | null
    platformOptions: string | null
    hashtags: string | null
    preferredFormat: string | null
    viewCount: number | null
    createdAt: Date
    updatedAt: Date
    _count: DistributionCountAggregateOutputType | null
    _avg: DistributionAvgAggregateOutputType | null
    _sum: DistributionSumAggregateOutputType | null
    _min: DistributionMinAggregateOutputType | null
    _max: DistributionMaxAggregateOutputType | null
  }

  type GetDistributionGroupByPayload<T extends DistributionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DistributionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DistributionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DistributionGroupByOutputType[P]>
            : GetScalarType<T[P], DistributionGroupByOutputType[P]>
        }
      >
    >


  export type DistributionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicationId?: boolean
    platform?: boolean
    status?: boolean
    ayrsharePostId?: boolean
    platformPostId?: boolean
    postUrl?: boolean
    errorMessage?: boolean
    scheduledAt?: boolean
    publishedAt?: boolean
    postText?: boolean
    mediaUrls?: boolean
    platformOptions?: boolean
    hashtags?: boolean
    preferredFormat?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publication?: boolean | PublicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["distribution"]>

  export type DistributionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicationId?: boolean
    platform?: boolean
    status?: boolean
    ayrsharePostId?: boolean
    platformPostId?: boolean
    postUrl?: boolean
    errorMessage?: boolean
    scheduledAt?: boolean
    publishedAt?: boolean
    postText?: boolean
    mediaUrls?: boolean
    platformOptions?: boolean
    hashtags?: boolean
    preferredFormat?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publication?: boolean | PublicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["distribution"]>

  export type DistributionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicationId?: boolean
    platform?: boolean
    status?: boolean
    ayrsharePostId?: boolean
    platformPostId?: boolean
    postUrl?: boolean
    errorMessage?: boolean
    scheduledAt?: boolean
    publishedAt?: boolean
    postText?: boolean
    mediaUrls?: boolean
    platformOptions?: boolean
    hashtags?: boolean
    preferredFormat?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publication?: boolean | PublicationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["distribution"]>

  export type DistributionSelectScalar = {
    id?: boolean
    publicationId?: boolean
    platform?: boolean
    status?: boolean
    ayrsharePostId?: boolean
    platformPostId?: boolean
    postUrl?: boolean
    errorMessage?: boolean
    scheduledAt?: boolean
    publishedAt?: boolean
    postText?: boolean
    mediaUrls?: boolean
    platformOptions?: boolean
    hashtags?: boolean
    preferredFormat?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DistributionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "publicationId" | "platform" | "status" | "ayrsharePostId" | "platformPostId" | "postUrl" | "errorMessage" | "scheduledAt" | "publishedAt" | "postText" | "mediaUrls" | "platformOptions" | "hashtags" | "preferredFormat" | "viewCount" | "createdAt" | "updatedAt", ExtArgs["result"]["distribution"]>
  export type DistributionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publication?: boolean | PublicationDefaultArgs<ExtArgs>
  }
  export type DistributionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publication?: boolean | PublicationDefaultArgs<ExtArgs>
  }
  export type DistributionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publication?: boolean | PublicationDefaultArgs<ExtArgs>
  }

  export type $DistributionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Distribution"
    objects: {
      publication: Prisma.$PublicationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      publicationId: string
      platform: string
      status: string
      ayrsharePostId: string | null
      platformPostId: string | null
      postUrl: string | null
      errorMessage: string | null
      scheduledAt: Date | null
      publishedAt: Date | null
      postText: string | null
      mediaUrls: string | null
      platformOptions: string | null
      hashtags: string | null
      preferredFormat: string | null
      viewCount: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["distribution"]>
    composites: {}
  }

  type DistributionGetPayload<S extends boolean | null | undefined | DistributionDefaultArgs> = $Result.GetResult<Prisma.$DistributionPayload, S>

  type DistributionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DistributionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DistributionCountAggregateInputType | true
    }

  export interface DistributionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Distribution'], meta: { name: 'Distribution' } }
    /**
     * Find zero or one Distribution that matches the filter.
     * @param {DistributionFindUniqueArgs} args - Arguments to find a Distribution
     * @example
     * // Get one Distribution
     * const distribution = await prisma.distribution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DistributionFindUniqueArgs>(args: SelectSubset<T, DistributionFindUniqueArgs<ExtArgs>>): Prisma__DistributionClient<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Distribution that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DistributionFindUniqueOrThrowArgs} args - Arguments to find a Distribution
     * @example
     * // Get one Distribution
     * const distribution = await prisma.distribution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DistributionFindUniqueOrThrowArgs>(args: SelectSubset<T, DistributionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DistributionClient<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Distribution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionFindFirstArgs} args - Arguments to find a Distribution
     * @example
     * // Get one Distribution
     * const distribution = await prisma.distribution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DistributionFindFirstArgs>(args?: SelectSubset<T, DistributionFindFirstArgs<ExtArgs>>): Prisma__DistributionClient<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Distribution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionFindFirstOrThrowArgs} args - Arguments to find a Distribution
     * @example
     * // Get one Distribution
     * const distribution = await prisma.distribution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DistributionFindFirstOrThrowArgs>(args?: SelectSubset<T, DistributionFindFirstOrThrowArgs<ExtArgs>>): Prisma__DistributionClient<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Distributions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Distributions
     * const distributions = await prisma.distribution.findMany()
     * 
     * // Get first 10 Distributions
     * const distributions = await prisma.distribution.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const distributionWithIdOnly = await prisma.distribution.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DistributionFindManyArgs>(args?: SelectSubset<T, DistributionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Distribution.
     * @param {DistributionCreateArgs} args - Arguments to create a Distribution.
     * @example
     * // Create one Distribution
     * const Distribution = await prisma.distribution.create({
     *   data: {
     *     // ... data to create a Distribution
     *   }
     * })
     * 
     */
    create<T extends DistributionCreateArgs>(args: SelectSubset<T, DistributionCreateArgs<ExtArgs>>): Prisma__DistributionClient<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Distributions.
     * @param {DistributionCreateManyArgs} args - Arguments to create many Distributions.
     * @example
     * // Create many Distributions
     * const distribution = await prisma.distribution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DistributionCreateManyArgs>(args?: SelectSubset<T, DistributionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Distributions and returns the data saved in the database.
     * @param {DistributionCreateManyAndReturnArgs} args - Arguments to create many Distributions.
     * @example
     * // Create many Distributions
     * const distribution = await prisma.distribution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Distributions and only return the `id`
     * const distributionWithIdOnly = await prisma.distribution.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DistributionCreateManyAndReturnArgs>(args?: SelectSubset<T, DistributionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Distribution.
     * @param {DistributionDeleteArgs} args - Arguments to delete one Distribution.
     * @example
     * // Delete one Distribution
     * const Distribution = await prisma.distribution.delete({
     *   where: {
     *     // ... filter to delete one Distribution
     *   }
     * })
     * 
     */
    delete<T extends DistributionDeleteArgs>(args: SelectSubset<T, DistributionDeleteArgs<ExtArgs>>): Prisma__DistributionClient<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Distribution.
     * @param {DistributionUpdateArgs} args - Arguments to update one Distribution.
     * @example
     * // Update one Distribution
     * const distribution = await prisma.distribution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DistributionUpdateArgs>(args: SelectSubset<T, DistributionUpdateArgs<ExtArgs>>): Prisma__DistributionClient<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Distributions.
     * @param {DistributionDeleteManyArgs} args - Arguments to filter Distributions to delete.
     * @example
     * // Delete a few Distributions
     * const { count } = await prisma.distribution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DistributionDeleteManyArgs>(args?: SelectSubset<T, DistributionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Distributions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Distributions
     * const distribution = await prisma.distribution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DistributionUpdateManyArgs>(args: SelectSubset<T, DistributionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Distributions and returns the data updated in the database.
     * @param {DistributionUpdateManyAndReturnArgs} args - Arguments to update many Distributions.
     * @example
     * // Update many Distributions
     * const distribution = await prisma.distribution.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Distributions and only return the `id`
     * const distributionWithIdOnly = await prisma.distribution.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DistributionUpdateManyAndReturnArgs>(args: SelectSubset<T, DistributionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Distribution.
     * @param {DistributionUpsertArgs} args - Arguments to update or create a Distribution.
     * @example
     * // Update or create a Distribution
     * const distribution = await prisma.distribution.upsert({
     *   create: {
     *     // ... data to create a Distribution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Distribution we want to update
     *   }
     * })
     */
    upsert<T extends DistributionUpsertArgs>(args: SelectSubset<T, DistributionUpsertArgs<ExtArgs>>): Prisma__DistributionClient<$Result.GetResult<Prisma.$DistributionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Distributions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionCountArgs} args - Arguments to filter Distributions to count.
     * @example
     * // Count the number of Distributions
     * const count = await prisma.distribution.count({
     *   where: {
     *     // ... the filter for the Distributions we want to count
     *   }
     * })
    **/
    count<T extends DistributionCountArgs>(
      args?: Subset<T, DistributionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DistributionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Distribution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DistributionAggregateArgs>(args: Subset<T, DistributionAggregateArgs>): Prisma.PrismaPromise<GetDistributionAggregateType<T>>

    /**
     * Group by Distribution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DistributionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DistributionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DistributionGroupByArgs['orderBy'] }
        : { orderBy?: DistributionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DistributionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDistributionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Distribution model
   */
  readonly fields: DistributionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Distribution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DistributionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    publication<T extends PublicationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PublicationDefaultArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Distribution model
   */
  interface DistributionFieldRefs {
    readonly id: FieldRef<"Distribution", 'String'>
    readonly publicationId: FieldRef<"Distribution", 'String'>
    readonly platform: FieldRef<"Distribution", 'String'>
    readonly status: FieldRef<"Distribution", 'String'>
    readonly ayrsharePostId: FieldRef<"Distribution", 'String'>
    readonly platformPostId: FieldRef<"Distribution", 'String'>
    readonly postUrl: FieldRef<"Distribution", 'String'>
    readonly errorMessage: FieldRef<"Distribution", 'String'>
    readonly scheduledAt: FieldRef<"Distribution", 'DateTime'>
    readonly publishedAt: FieldRef<"Distribution", 'DateTime'>
    readonly postText: FieldRef<"Distribution", 'String'>
    readonly mediaUrls: FieldRef<"Distribution", 'String'>
    readonly platformOptions: FieldRef<"Distribution", 'String'>
    readonly hashtags: FieldRef<"Distribution", 'String'>
    readonly preferredFormat: FieldRef<"Distribution", 'String'>
    readonly viewCount: FieldRef<"Distribution", 'Int'>
    readonly createdAt: FieldRef<"Distribution", 'DateTime'>
    readonly updatedAt: FieldRef<"Distribution", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Distribution findUnique
   */
  export type DistributionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionInclude<ExtArgs> | null
    /**
     * Filter, which Distribution to fetch.
     */
    where: DistributionWhereUniqueInput
  }

  /**
   * Distribution findUniqueOrThrow
   */
  export type DistributionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionInclude<ExtArgs> | null
    /**
     * Filter, which Distribution to fetch.
     */
    where: DistributionWhereUniqueInput
  }

  /**
   * Distribution findFirst
   */
  export type DistributionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionInclude<ExtArgs> | null
    /**
     * Filter, which Distribution to fetch.
     */
    where?: DistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Distributions to fetch.
     */
    orderBy?: DistributionOrderByWithRelationInput | DistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Distributions.
     */
    cursor?: DistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Distributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Distributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Distributions.
     */
    distinct?: DistributionScalarFieldEnum | DistributionScalarFieldEnum[]
  }

  /**
   * Distribution findFirstOrThrow
   */
  export type DistributionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionInclude<ExtArgs> | null
    /**
     * Filter, which Distribution to fetch.
     */
    where?: DistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Distributions to fetch.
     */
    orderBy?: DistributionOrderByWithRelationInput | DistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Distributions.
     */
    cursor?: DistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Distributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Distributions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Distributions.
     */
    distinct?: DistributionScalarFieldEnum | DistributionScalarFieldEnum[]
  }

  /**
   * Distribution findMany
   */
  export type DistributionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionInclude<ExtArgs> | null
    /**
     * Filter, which Distributions to fetch.
     */
    where?: DistributionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Distributions to fetch.
     */
    orderBy?: DistributionOrderByWithRelationInput | DistributionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Distributions.
     */
    cursor?: DistributionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Distributions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Distributions.
     */
    skip?: number
    distinct?: DistributionScalarFieldEnum | DistributionScalarFieldEnum[]
  }

  /**
   * Distribution create
   */
  export type DistributionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionInclude<ExtArgs> | null
    /**
     * The data needed to create a Distribution.
     */
    data: XOR<DistributionCreateInput, DistributionUncheckedCreateInput>
  }

  /**
   * Distribution createMany
   */
  export type DistributionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Distributions.
     */
    data: DistributionCreateManyInput | DistributionCreateManyInput[]
  }

  /**
   * Distribution createManyAndReturn
   */
  export type DistributionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * The data used to create many Distributions.
     */
    data: DistributionCreateManyInput | DistributionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Distribution update
   */
  export type DistributionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionInclude<ExtArgs> | null
    /**
     * The data needed to update a Distribution.
     */
    data: XOR<DistributionUpdateInput, DistributionUncheckedUpdateInput>
    /**
     * Choose, which Distribution to update.
     */
    where: DistributionWhereUniqueInput
  }

  /**
   * Distribution updateMany
   */
  export type DistributionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Distributions.
     */
    data: XOR<DistributionUpdateManyMutationInput, DistributionUncheckedUpdateManyInput>
    /**
     * Filter which Distributions to update
     */
    where?: DistributionWhereInput
    /**
     * Limit how many Distributions to update.
     */
    limit?: number
  }

  /**
   * Distribution updateManyAndReturn
   */
  export type DistributionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * The data used to update Distributions.
     */
    data: XOR<DistributionUpdateManyMutationInput, DistributionUncheckedUpdateManyInput>
    /**
     * Filter which Distributions to update
     */
    where?: DistributionWhereInput
    /**
     * Limit how many Distributions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Distribution upsert
   */
  export type DistributionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionInclude<ExtArgs> | null
    /**
     * The filter to search for the Distribution to update in case it exists.
     */
    where: DistributionWhereUniqueInput
    /**
     * In case the Distribution found by the `where` argument doesn't exist, create a new Distribution with this data.
     */
    create: XOR<DistributionCreateInput, DistributionUncheckedCreateInput>
    /**
     * In case the Distribution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DistributionUpdateInput, DistributionUncheckedUpdateInput>
  }

  /**
   * Distribution delete
   */
  export type DistributionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionInclude<ExtArgs> | null
    /**
     * Filter which Distribution to delete.
     */
    where: DistributionWhereUniqueInput
  }

  /**
   * Distribution deleteMany
   */
  export type DistributionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Distributions to delete
     */
    where?: DistributionWhereInput
    /**
     * Limit how many Distributions to delete.
     */
    limit?: number
  }

  /**
   * Distribution without action
   */
  export type DistributionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Distribution
     */
    select?: DistributionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Distribution
     */
    omit?: DistributionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DistributionInclude<ExtArgs> | null
  }


  /**
   * Model AyrshareProfile
   */

  export type AggregateAyrshareProfile = {
    _count: AyrshareProfileCountAggregateOutputType | null
    _min: AyrshareProfileMinAggregateOutputType | null
    _max: AyrshareProfileMaxAggregateOutputType | null
  }

  export type AyrshareProfileMinAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    name: string | null
    profileKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AyrshareProfileMaxAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    name: string | null
    profileKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AyrshareProfileCountAggregateOutputType = {
    id: number
    workspaceId: number
    name: number
    profileKey: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AyrshareProfileMinAggregateInputType = {
    id?: true
    workspaceId?: true
    name?: true
    profileKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AyrshareProfileMaxAggregateInputType = {
    id?: true
    workspaceId?: true
    name?: true
    profileKey?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AyrshareProfileCountAggregateInputType = {
    id?: true
    workspaceId?: true
    name?: true
    profileKey?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AyrshareProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AyrshareProfile to aggregate.
     */
    where?: AyrshareProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AyrshareProfiles to fetch.
     */
    orderBy?: AyrshareProfileOrderByWithRelationInput | AyrshareProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AyrshareProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AyrshareProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AyrshareProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AyrshareProfiles
    **/
    _count?: true | AyrshareProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AyrshareProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AyrshareProfileMaxAggregateInputType
  }

  export type GetAyrshareProfileAggregateType<T extends AyrshareProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateAyrshareProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAyrshareProfile[P]>
      : GetScalarType<T[P], AggregateAyrshareProfile[P]>
  }




  export type AyrshareProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AyrshareProfileWhereInput
    orderBy?: AyrshareProfileOrderByWithAggregationInput | AyrshareProfileOrderByWithAggregationInput[]
    by: AyrshareProfileScalarFieldEnum[] | AyrshareProfileScalarFieldEnum
    having?: AyrshareProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AyrshareProfileCountAggregateInputType | true
    _min?: AyrshareProfileMinAggregateInputType
    _max?: AyrshareProfileMaxAggregateInputType
  }

  export type AyrshareProfileGroupByOutputType = {
    id: string
    workspaceId: string
    name: string
    profileKey: string
    createdAt: Date
    updatedAt: Date
    _count: AyrshareProfileCountAggregateOutputType | null
    _min: AyrshareProfileMinAggregateOutputType | null
    _max: AyrshareProfileMaxAggregateOutputType | null
  }

  type GetAyrshareProfileGroupByPayload<T extends AyrshareProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AyrshareProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AyrshareProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AyrshareProfileGroupByOutputType[P]>
            : GetScalarType<T[P], AyrshareProfileGroupByOutputType[P]>
        }
      >
    >


  export type AyrshareProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    name?: boolean
    profileKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publications?: boolean | AyrshareProfile$publicationsArgs<ExtArgs>
    _count?: boolean | AyrshareProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ayrshareProfile"]>

  export type AyrshareProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    name?: boolean
    profileKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ayrshareProfile"]>

  export type AyrshareProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    name?: boolean
    profileKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ayrshareProfile"]>

  export type AyrshareProfileSelectScalar = {
    id?: boolean
    workspaceId?: boolean
    name?: boolean
    profileKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AyrshareProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workspaceId" | "name" | "profileKey" | "createdAt" | "updatedAt", ExtArgs["result"]["ayrshareProfile"]>
  export type AyrshareProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    publications?: boolean | AyrshareProfile$publicationsArgs<ExtArgs>
    _count?: boolean | AyrshareProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AyrshareProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AyrshareProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AyrshareProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AyrshareProfile"
    objects: {
      publications: Prisma.$PublicationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workspaceId: string
      name: string
      profileKey: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ayrshareProfile"]>
    composites: {}
  }

  type AyrshareProfileGetPayload<S extends boolean | null | undefined | AyrshareProfileDefaultArgs> = $Result.GetResult<Prisma.$AyrshareProfilePayload, S>

  type AyrshareProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AyrshareProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AyrshareProfileCountAggregateInputType | true
    }

  export interface AyrshareProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AyrshareProfile'], meta: { name: 'AyrshareProfile' } }
    /**
     * Find zero or one AyrshareProfile that matches the filter.
     * @param {AyrshareProfileFindUniqueArgs} args - Arguments to find a AyrshareProfile
     * @example
     * // Get one AyrshareProfile
     * const ayrshareProfile = await prisma.ayrshareProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AyrshareProfileFindUniqueArgs>(args: SelectSubset<T, AyrshareProfileFindUniqueArgs<ExtArgs>>): Prisma__AyrshareProfileClient<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AyrshareProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AyrshareProfileFindUniqueOrThrowArgs} args - Arguments to find a AyrshareProfile
     * @example
     * // Get one AyrshareProfile
     * const ayrshareProfile = await prisma.ayrshareProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AyrshareProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, AyrshareProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AyrshareProfileClient<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AyrshareProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AyrshareProfileFindFirstArgs} args - Arguments to find a AyrshareProfile
     * @example
     * // Get one AyrshareProfile
     * const ayrshareProfile = await prisma.ayrshareProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AyrshareProfileFindFirstArgs>(args?: SelectSubset<T, AyrshareProfileFindFirstArgs<ExtArgs>>): Prisma__AyrshareProfileClient<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AyrshareProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AyrshareProfileFindFirstOrThrowArgs} args - Arguments to find a AyrshareProfile
     * @example
     * // Get one AyrshareProfile
     * const ayrshareProfile = await prisma.ayrshareProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AyrshareProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, AyrshareProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__AyrshareProfileClient<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AyrshareProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AyrshareProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AyrshareProfiles
     * const ayrshareProfiles = await prisma.ayrshareProfile.findMany()
     * 
     * // Get first 10 AyrshareProfiles
     * const ayrshareProfiles = await prisma.ayrshareProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ayrshareProfileWithIdOnly = await prisma.ayrshareProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AyrshareProfileFindManyArgs>(args?: SelectSubset<T, AyrshareProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AyrshareProfile.
     * @param {AyrshareProfileCreateArgs} args - Arguments to create a AyrshareProfile.
     * @example
     * // Create one AyrshareProfile
     * const AyrshareProfile = await prisma.ayrshareProfile.create({
     *   data: {
     *     // ... data to create a AyrshareProfile
     *   }
     * })
     * 
     */
    create<T extends AyrshareProfileCreateArgs>(args: SelectSubset<T, AyrshareProfileCreateArgs<ExtArgs>>): Prisma__AyrshareProfileClient<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AyrshareProfiles.
     * @param {AyrshareProfileCreateManyArgs} args - Arguments to create many AyrshareProfiles.
     * @example
     * // Create many AyrshareProfiles
     * const ayrshareProfile = await prisma.ayrshareProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AyrshareProfileCreateManyArgs>(args?: SelectSubset<T, AyrshareProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AyrshareProfiles and returns the data saved in the database.
     * @param {AyrshareProfileCreateManyAndReturnArgs} args - Arguments to create many AyrshareProfiles.
     * @example
     * // Create many AyrshareProfiles
     * const ayrshareProfile = await prisma.ayrshareProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AyrshareProfiles and only return the `id`
     * const ayrshareProfileWithIdOnly = await prisma.ayrshareProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AyrshareProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, AyrshareProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AyrshareProfile.
     * @param {AyrshareProfileDeleteArgs} args - Arguments to delete one AyrshareProfile.
     * @example
     * // Delete one AyrshareProfile
     * const AyrshareProfile = await prisma.ayrshareProfile.delete({
     *   where: {
     *     // ... filter to delete one AyrshareProfile
     *   }
     * })
     * 
     */
    delete<T extends AyrshareProfileDeleteArgs>(args: SelectSubset<T, AyrshareProfileDeleteArgs<ExtArgs>>): Prisma__AyrshareProfileClient<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AyrshareProfile.
     * @param {AyrshareProfileUpdateArgs} args - Arguments to update one AyrshareProfile.
     * @example
     * // Update one AyrshareProfile
     * const ayrshareProfile = await prisma.ayrshareProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AyrshareProfileUpdateArgs>(args: SelectSubset<T, AyrshareProfileUpdateArgs<ExtArgs>>): Prisma__AyrshareProfileClient<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AyrshareProfiles.
     * @param {AyrshareProfileDeleteManyArgs} args - Arguments to filter AyrshareProfiles to delete.
     * @example
     * // Delete a few AyrshareProfiles
     * const { count } = await prisma.ayrshareProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AyrshareProfileDeleteManyArgs>(args?: SelectSubset<T, AyrshareProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AyrshareProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AyrshareProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AyrshareProfiles
     * const ayrshareProfile = await prisma.ayrshareProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AyrshareProfileUpdateManyArgs>(args: SelectSubset<T, AyrshareProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AyrshareProfiles and returns the data updated in the database.
     * @param {AyrshareProfileUpdateManyAndReturnArgs} args - Arguments to update many AyrshareProfiles.
     * @example
     * // Update many AyrshareProfiles
     * const ayrshareProfile = await prisma.ayrshareProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AyrshareProfiles and only return the `id`
     * const ayrshareProfileWithIdOnly = await prisma.ayrshareProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AyrshareProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, AyrshareProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AyrshareProfile.
     * @param {AyrshareProfileUpsertArgs} args - Arguments to update or create a AyrshareProfile.
     * @example
     * // Update or create a AyrshareProfile
     * const ayrshareProfile = await prisma.ayrshareProfile.upsert({
     *   create: {
     *     // ... data to create a AyrshareProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AyrshareProfile we want to update
     *   }
     * })
     */
    upsert<T extends AyrshareProfileUpsertArgs>(args: SelectSubset<T, AyrshareProfileUpsertArgs<ExtArgs>>): Prisma__AyrshareProfileClient<$Result.GetResult<Prisma.$AyrshareProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AyrshareProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AyrshareProfileCountArgs} args - Arguments to filter AyrshareProfiles to count.
     * @example
     * // Count the number of AyrshareProfiles
     * const count = await prisma.ayrshareProfile.count({
     *   where: {
     *     // ... the filter for the AyrshareProfiles we want to count
     *   }
     * })
    **/
    count<T extends AyrshareProfileCountArgs>(
      args?: Subset<T, AyrshareProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AyrshareProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AyrshareProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AyrshareProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AyrshareProfileAggregateArgs>(args: Subset<T, AyrshareProfileAggregateArgs>): Prisma.PrismaPromise<GetAyrshareProfileAggregateType<T>>

    /**
     * Group by AyrshareProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AyrshareProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AyrshareProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AyrshareProfileGroupByArgs['orderBy'] }
        : { orderBy?: AyrshareProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AyrshareProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAyrshareProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AyrshareProfile model
   */
  readonly fields: AyrshareProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AyrshareProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AyrshareProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    publications<T extends AyrshareProfile$publicationsArgs<ExtArgs> = {}>(args?: Subset<T, AyrshareProfile$publicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AyrshareProfile model
   */
  interface AyrshareProfileFieldRefs {
    readonly id: FieldRef<"AyrshareProfile", 'String'>
    readonly workspaceId: FieldRef<"AyrshareProfile", 'String'>
    readonly name: FieldRef<"AyrshareProfile", 'String'>
    readonly profileKey: FieldRef<"AyrshareProfile", 'String'>
    readonly createdAt: FieldRef<"AyrshareProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"AyrshareProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AyrshareProfile findUnique
   */
  export type AyrshareProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AyrshareProfileInclude<ExtArgs> | null
    /**
     * Filter, which AyrshareProfile to fetch.
     */
    where: AyrshareProfileWhereUniqueInput
  }

  /**
   * AyrshareProfile findUniqueOrThrow
   */
  export type AyrshareProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AyrshareProfileInclude<ExtArgs> | null
    /**
     * Filter, which AyrshareProfile to fetch.
     */
    where: AyrshareProfileWhereUniqueInput
  }

  /**
   * AyrshareProfile findFirst
   */
  export type AyrshareProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AyrshareProfileInclude<ExtArgs> | null
    /**
     * Filter, which AyrshareProfile to fetch.
     */
    where?: AyrshareProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AyrshareProfiles to fetch.
     */
    orderBy?: AyrshareProfileOrderByWithRelationInput | AyrshareProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AyrshareProfiles.
     */
    cursor?: AyrshareProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AyrshareProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AyrshareProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AyrshareProfiles.
     */
    distinct?: AyrshareProfileScalarFieldEnum | AyrshareProfileScalarFieldEnum[]
  }

  /**
   * AyrshareProfile findFirstOrThrow
   */
  export type AyrshareProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AyrshareProfileInclude<ExtArgs> | null
    /**
     * Filter, which AyrshareProfile to fetch.
     */
    where?: AyrshareProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AyrshareProfiles to fetch.
     */
    orderBy?: AyrshareProfileOrderByWithRelationInput | AyrshareProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AyrshareProfiles.
     */
    cursor?: AyrshareProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AyrshareProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AyrshareProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AyrshareProfiles.
     */
    distinct?: AyrshareProfileScalarFieldEnum | AyrshareProfileScalarFieldEnum[]
  }

  /**
   * AyrshareProfile findMany
   */
  export type AyrshareProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AyrshareProfileInclude<ExtArgs> | null
    /**
     * Filter, which AyrshareProfiles to fetch.
     */
    where?: AyrshareProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AyrshareProfiles to fetch.
     */
    orderBy?: AyrshareProfileOrderByWithRelationInput | AyrshareProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AyrshareProfiles.
     */
    cursor?: AyrshareProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AyrshareProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AyrshareProfiles.
     */
    skip?: number
    distinct?: AyrshareProfileScalarFieldEnum | AyrshareProfileScalarFieldEnum[]
  }

  /**
   * AyrshareProfile create
   */
  export type AyrshareProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AyrshareProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a AyrshareProfile.
     */
    data: XOR<AyrshareProfileCreateInput, AyrshareProfileUncheckedCreateInput>
  }

  /**
   * AyrshareProfile createMany
   */
  export type AyrshareProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AyrshareProfiles.
     */
    data: AyrshareProfileCreateManyInput | AyrshareProfileCreateManyInput[]
  }

  /**
   * AyrshareProfile createManyAndReturn
   */
  export type AyrshareProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * The data used to create many AyrshareProfiles.
     */
    data: AyrshareProfileCreateManyInput | AyrshareProfileCreateManyInput[]
  }

  /**
   * AyrshareProfile update
   */
  export type AyrshareProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AyrshareProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a AyrshareProfile.
     */
    data: XOR<AyrshareProfileUpdateInput, AyrshareProfileUncheckedUpdateInput>
    /**
     * Choose, which AyrshareProfile to update.
     */
    where: AyrshareProfileWhereUniqueInput
  }

  /**
   * AyrshareProfile updateMany
   */
  export type AyrshareProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AyrshareProfiles.
     */
    data: XOR<AyrshareProfileUpdateManyMutationInput, AyrshareProfileUncheckedUpdateManyInput>
    /**
     * Filter which AyrshareProfiles to update
     */
    where?: AyrshareProfileWhereInput
    /**
     * Limit how many AyrshareProfiles to update.
     */
    limit?: number
  }

  /**
   * AyrshareProfile updateManyAndReturn
   */
  export type AyrshareProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * The data used to update AyrshareProfiles.
     */
    data: XOR<AyrshareProfileUpdateManyMutationInput, AyrshareProfileUncheckedUpdateManyInput>
    /**
     * Filter which AyrshareProfiles to update
     */
    where?: AyrshareProfileWhereInput
    /**
     * Limit how many AyrshareProfiles to update.
     */
    limit?: number
  }

  /**
   * AyrshareProfile upsert
   */
  export type AyrshareProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AyrshareProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the AyrshareProfile to update in case it exists.
     */
    where: AyrshareProfileWhereUniqueInput
    /**
     * In case the AyrshareProfile found by the `where` argument doesn't exist, create a new AyrshareProfile with this data.
     */
    create: XOR<AyrshareProfileCreateInput, AyrshareProfileUncheckedCreateInput>
    /**
     * In case the AyrshareProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AyrshareProfileUpdateInput, AyrshareProfileUncheckedUpdateInput>
  }

  /**
   * AyrshareProfile delete
   */
  export type AyrshareProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AyrshareProfileInclude<ExtArgs> | null
    /**
     * Filter which AyrshareProfile to delete.
     */
    where: AyrshareProfileWhereUniqueInput
  }

  /**
   * AyrshareProfile deleteMany
   */
  export type AyrshareProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AyrshareProfiles to delete
     */
    where?: AyrshareProfileWhereInput
    /**
     * Limit how many AyrshareProfiles to delete.
     */
    limit?: number
  }

  /**
   * AyrshareProfile.publications
   */
  export type AyrshareProfile$publicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PublicationInclude<ExtArgs> | null
    where?: PublicationWhereInput
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    cursor?: PublicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * AyrshareProfile without action
   */
  export type AyrshareProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AyrshareProfile
     */
    select?: AyrshareProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AyrshareProfile
     */
    omit?: AyrshareProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AyrshareProfileInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PublicationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    postText: 'postText',
    mediaUrls: 'mediaUrls',
    mediaUrlsByFormat: 'mediaUrlsByFormat',
    scheduledAt: 'scheduledAt',
    ayrshareProfileId: 'ayrshareProfileId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PublicationScalarFieldEnum = (typeof PublicationScalarFieldEnum)[keyof typeof PublicationScalarFieldEnum]


  export const DistributionScalarFieldEnum: {
    id: 'id',
    publicationId: 'publicationId',
    platform: 'platform',
    status: 'status',
    ayrsharePostId: 'ayrsharePostId',
    platformPostId: 'platformPostId',
    postUrl: 'postUrl',
    errorMessage: 'errorMessage',
    scheduledAt: 'scheduledAt',
    publishedAt: 'publishedAt',
    postText: 'postText',
    mediaUrls: 'mediaUrls',
    platformOptions: 'platformOptions',
    hashtags: 'hashtags',
    preferredFormat: 'preferredFormat',
    viewCount: 'viewCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DistributionScalarFieldEnum = (typeof DistributionScalarFieldEnum)[keyof typeof DistributionScalarFieldEnum]


  export const AyrshareProfileScalarFieldEnum: {
    id: 'id',
    workspaceId: 'workspaceId',
    name: 'name',
    profileKey: 'profileKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AyrshareProfileScalarFieldEnum = (typeof AyrshareProfileScalarFieldEnum)[keyof typeof AyrshareProfileScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type PublicationWhereInput = {
    AND?: PublicationWhereInput | PublicationWhereInput[]
    OR?: PublicationWhereInput[]
    NOT?: PublicationWhereInput | PublicationWhereInput[]
    id?: StringFilter<"Publication"> | string
    title?: StringFilter<"Publication"> | string
    description?: StringNullableFilter<"Publication"> | string | null
    postText?: StringNullableFilter<"Publication"> | string | null
    mediaUrls?: StringNullableFilter<"Publication"> | string | null
    mediaUrlsByFormat?: StringNullableFilter<"Publication"> | string | null
    scheduledAt?: DateTimeNullableFilter<"Publication"> | Date | string | null
    ayrshareProfileId?: StringNullableFilter<"Publication"> | string | null
    createdAt?: DateTimeFilter<"Publication"> | Date | string
    updatedAt?: DateTimeFilter<"Publication"> | Date | string
    distributions?: DistributionListRelationFilter
    ayrshareProfile?: XOR<AyrshareProfileNullableScalarRelationFilter, AyrshareProfileWhereInput> | null
  }

  export type PublicationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    postText?: SortOrderInput | SortOrder
    mediaUrls?: SortOrderInput | SortOrder
    mediaUrlsByFormat?: SortOrderInput | SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    ayrshareProfileId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    distributions?: DistributionOrderByRelationAggregateInput
    ayrshareProfile?: AyrshareProfileOrderByWithRelationInput
  }

  export type PublicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PublicationWhereInput | PublicationWhereInput[]
    OR?: PublicationWhereInput[]
    NOT?: PublicationWhereInput | PublicationWhereInput[]
    title?: StringFilter<"Publication"> | string
    description?: StringNullableFilter<"Publication"> | string | null
    postText?: StringNullableFilter<"Publication"> | string | null
    mediaUrls?: StringNullableFilter<"Publication"> | string | null
    mediaUrlsByFormat?: StringNullableFilter<"Publication"> | string | null
    scheduledAt?: DateTimeNullableFilter<"Publication"> | Date | string | null
    ayrshareProfileId?: StringNullableFilter<"Publication"> | string | null
    createdAt?: DateTimeFilter<"Publication"> | Date | string
    updatedAt?: DateTimeFilter<"Publication"> | Date | string
    distributions?: DistributionListRelationFilter
    ayrshareProfile?: XOR<AyrshareProfileNullableScalarRelationFilter, AyrshareProfileWhereInput> | null
  }, "id">

  export type PublicationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    postText?: SortOrderInput | SortOrder
    mediaUrls?: SortOrderInput | SortOrder
    mediaUrlsByFormat?: SortOrderInput | SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    ayrshareProfileId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PublicationCountOrderByAggregateInput
    _max?: PublicationMaxOrderByAggregateInput
    _min?: PublicationMinOrderByAggregateInput
  }

  export type PublicationScalarWhereWithAggregatesInput = {
    AND?: PublicationScalarWhereWithAggregatesInput | PublicationScalarWhereWithAggregatesInput[]
    OR?: PublicationScalarWhereWithAggregatesInput[]
    NOT?: PublicationScalarWhereWithAggregatesInput | PublicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Publication"> | string
    title?: StringWithAggregatesFilter<"Publication"> | string
    description?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    postText?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    mediaUrls?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    mediaUrlsByFormat?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    scheduledAt?: DateTimeNullableWithAggregatesFilter<"Publication"> | Date | string | null
    ayrshareProfileId?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Publication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Publication"> | Date | string
  }

  export type DistributionWhereInput = {
    AND?: DistributionWhereInput | DistributionWhereInput[]
    OR?: DistributionWhereInput[]
    NOT?: DistributionWhereInput | DistributionWhereInput[]
    id?: StringFilter<"Distribution"> | string
    publicationId?: StringFilter<"Distribution"> | string
    platform?: StringFilter<"Distribution"> | string
    status?: StringFilter<"Distribution"> | string
    ayrsharePostId?: StringNullableFilter<"Distribution"> | string | null
    platformPostId?: StringNullableFilter<"Distribution"> | string | null
    postUrl?: StringNullableFilter<"Distribution"> | string | null
    errorMessage?: StringNullableFilter<"Distribution"> | string | null
    scheduledAt?: DateTimeNullableFilter<"Distribution"> | Date | string | null
    publishedAt?: DateTimeNullableFilter<"Distribution"> | Date | string | null
    postText?: StringNullableFilter<"Distribution"> | string | null
    mediaUrls?: StringNullableFilter<"Distribution"> | string | null
    platformOptions?: StringNullableFilter<"Distribution"> | string | null
    hashtags?: StringNullableFilter<"Distribution"> | string | null
    preferredFormat?: StringNullableFilter<"Distribution"> | string | null
    viewCount?: IntNullableFilter<"Distribution"> | number | null
    createdAt?: DateTimeFilter<"Distribution"> | Date | string
    updatedAt?: DateTimeFilter<"Distribution"> | Date | string
    publication?: XOR<PublicationScalarRelationFilter, PublicationWhereInput>
  }

  export type DistributionOrderByWithRelationInput = {
    id?: SortOrder
    publicationId?: SortOrder
    platform?: SortOrder
    status?: SortOrder
    ayrsharePostId?: SortOrderInput | SortOrder
    platformPostId?: SortOrderInput | SortOrder
    postUrl?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    postText?: SortOrderInput | SortOrder
    mediaUrls?: SortOrderInput | SortOrder
    platformOptions?: SortOrderInput | SortOrder
    hashtags?: SortOrderInput | SortOrder
    preferredFormat?: SortOrderInput | SortOrder
    viewCount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publication?: PublicationOrderByWithRelationInput
  }

  export type DistributionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DistributionWhereInput | DistributionWhereInput[]
    OR?: DistributionWhereInput[]
    NOT?: DistributionWhereInput | DistributionWhereInput[]
    publicationId?: StringFilter<"Distribution"> | string
    platform?: StringFilter<"Distribution"> | string
    status?: StringFilter<"Distribution"> | string
    ayrsharePostId?: StringNullableFilter<"Distribution"> | string | null
    platformPostId?: StringNullableFilter<"Distribution"> | string | null
    postUrl?: StringNullableFilter<"Distribution"> | string | null
    errorMessage?: StringNullableFilter<"Distribution"> | string | null
    scheduledAt?: DateTimeNullableFilter<"Distribution"> | Date | string | null
    publishedAt?: DateTimeNullableFilter<"Distribution"> | Date | string | null
    postText?: StringNullableFilter<"Distribution"> | string | null
    mediaUrls?: StringNullableFilter<"Distribution"> | string | null
    platformOptions?: StringNullableFilter<"Distribution"> | string | null
    hashtags?: StringNullableFilter<"Distribution"> | string | null
    preferredFormat?: StringNullableFilter<"Distribution"> | string | null
    viewCount?: IntNullableFilter<"Distribution"> | number | null
    createdAt?: DateTimeFilter<"Distribution"> | Date | string
    updatedAt?: DateTimeFilter<"Distribution"> | Date | string
    publication?: XOR<PublicationScalarRelationFilter, PublicationWhereInput>
  }, "id">

  export type DistributionOrderByWithAggregationInput = {
    id?: SortOrder
    publicationId?: SortOrder
    platform?: SortOrder
    status?: SortOrder
    ayrsharePostId?: SortOrderInput | SortOrder
    platformPostId?: SortOrderInput | SortOrder
    postUrl?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    publishedAt?: SortOrderInput | SortOrder
    postText?: SortOrderInput | SortOrder
    mediaUrls?: SortOrderInput | SortOrder
    platformOptions?: SortOrderInput | SortOrder
    hashtags?: SortOrderInput | SortOrder
    preferredFormat?: SortOrderInput | SortOrder
    viewCount?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DistributionCountOrderByAggregateInput
    _avg?: DistributionAvgOrderByAggregateInput
    _max?: DistributionMaxOrderByAggregateInput
    _min?: DistributionMinOrderByAggregateInput
    _sum?: DistributionSumOrderByAggregateInput
  }

  export type DistributionScalarWhereWithAggregatesInput = {
    AND?: DistributionScalarWhereWithAggregatesInput | DistributionScalarWhereWithAggregatesInput[]
    OR?: DistributionScalarWhereWithAggregatesInput[]
    NOT?: DistributionScalarWhereWithAggregatesInput | DistributionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Distribution"> | string
    publicationId?: StringWithAggregatesFilter<"Distribution"> | string
    platform?: StringWithAggregatesFilter<"Distribution"> | string
    status?: StringWithAggregatesFilter<"Distribution"> | string
    ayrsharePostId?: StringNullableWithAggregatesFilter<"Distribution"> | string | null
    platformPostId?: StringNullableWithAggregatesFilter<"Distribution"> | string | null
    postUrl?: StringNullableWithAggregatesFilter<"Distribution"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"Distribution"> | string | null
    scheduledAt?: DateTimeNullableWithAggregatesFilter<"Distribution"> | Date | string | null
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Distribution"> | Date | string | null
    postText?: StringNullableWithAggregatesFilter<"Distribution"> | string | null
    mediaUrls?: StringNullableWithAggregatesFilter<"Distribution"> | string | null
    platformOptions?: StringNullableWithAggregatesFilter<"Distribution"> | string | null
    hashtags?: StringNullableWithAggregatesFilter<"Distribution"> | string | null
    preferredFormat?: StringNullableWithAggregatesFilter<"Distribution"> | string | null
    viewCount?: IntNullableWithAggregatesFilter<"Distribution"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Distribution"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Distribution"> | Date | string
  }

  export type AyrshareProfileWhereInput = {
    AND?: AyrshareProfileWhereInput | AyrshareProfileWhereInput[]
    OR?: AyrshareProfileWhereInput[]
    NOT?: AyrshareProfileWhereInput | AyrshareProfileWhereInput[]
    id?: StringFilter<"AyrshareProfile"> | string
    workspaceId?: StringFilter<"AyrshareProfile"> | string
    name?: StringFilter<"AyrshareProfile"> | string
    profileKey?: StringFilter<"AyrshareProfile"> | string
    createdAt?: DateTimeFilter<"AyrshareProfile"> | Date | string
    updatedAt?: DateTimeFilter<"AyrshareProfile"> | Date | string
    publications?: PublicationListRelationFilter
  }

  export type AyrshareProfileOrderByWithRelationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    name?: SortOrder
    profileKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publications?: PublicationOrderByRelationAggregateInput
  }

  export type AyrshareProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    workspaceId_profileKey?: AyrshareProfileWorkspaceIdProfileKeyCompoundUniqueInput
    AND?: AyrshareProfileWhereInput | AyrshareProfileWhereInput[]
    OR?: AyrshareProfileWhereInput[]
    NOT?: AyrshareProfileWhereInput | AyrshareProfileWhereInput[]
    workspaceId?: StringFilter<"AyrshareProfile"> | string
    name?: StringFilter<"AyrshareProfile"> | string
    profileKey?: StringFilter<"AyrshareProfile"> | string
    createdAt?: DateTimeFilter<"AyrshareProfile"> | Date | string
    updatedAt?: DateTimeFilter<"AyrshareProfile"> | Date | string
    publications?: PublicationListRelationFilter
  }, "id" | "workspaceId_profileKey">

  export type AyrshareProfileOrderByWithAggregationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    name?: SortOrder
    profileKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AyrshareProfileCountOrderByAggregateInput
    _max?: AyrshareProfileMaxOrderByAggregateInput
    _min?: AyrshareProfileMinOrderByAggregateInput
  }

  export type AyrshareProfileScalarWhereWithAggregatesInput = {
    AND?: AyrshareProfileScalarWhereWithAggregatesInput | AyrshareProfileScalarWhereWithAggregatesInput[]
    OR?: AyrshareProfileScalarWhereWithAggregatesInput[]
    NOT?: AyrshareProfileScalarWhereWithAggregatesInput | AyrshareProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AyrshareProfile"> | string
    workspaceId?: StringWithAggregatesFilter<"AyrshareProfile"> | string
    name?: StringWithAggregatesFilter<"AyrshareProfile"> | string
    profileKey?: StringWithAggregatesFilter<"AyrshareProfile"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AyrshareProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AyrshareProfile"> | Date | string
  }

  export type PublicationCreateInput = {
    id?: string
    title: string
    description?: string | null
    postText?: string | null
    mediaUrls?: string | null
    mediaUrlsByFormat?: string | null
    scheduledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    distributions?: DistributionCreateNestedManyWithoutPublicationInput
    ayrshareProfile?: AyrshareProfileCreateNestedOneWithoutPublicationsInput
  }

  export type PublicationUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    postText?: string | null
    mediaUrls?: string | null
    mediaUrlsByFormat?: string | null
    scheduledAt?: Date | string | null
    ayrshareProfileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    distributions?: DistributionUncheckedCreateNestedManyWithoutPublicationInput
  }

  export type PublicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrlsByFormat?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    distributions?: DistributionUpdateManyWithoutPublicationNestedInput
    ayrshareProfile?: AyrshareProfileUpdateOneWithoutPublicationsNestedInput
  }

  export type PublicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrlsByFormat?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ayrshareProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    distributions?: DistributionUncheckedUpdateManyWithoutPublicationNestedInput
  }

  export type PublicationCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    postText?: string | null
    mediaUrls?: string | null
    mediaUrlsByFormat?: string | null
    scheduledAt?: Date | string | null
    ayrshareProfileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrlsByFormat?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrlsByFormat?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ayrshareProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DistributionCreateInput = {
    id?: string
    platform: string
    status?: string
    ayrsharePostId?: string | null
    platformPostId?: string | null
    postUrl?: string | null
    errorMessage?: string | null
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    postText?: string | null
    mediaUrls?: string | null
    platformOptions?: string | null
    hashtags?: string | null
    preferredFormat?: string | null
    viewCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publication: PublicationCreateNestedOneWithoutDistributionsInput
  }

  export type DistributionUncheckedCreateInput = {
    id?: string
    publicationId: string
    platform: string
    status?: string
    ayrsharePostId?: string | null
    platformPostId?: string | null
    postUrl?: string | null
    errorMessage?: string | null
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    postText?: string | null
    mediaUrls?: string | null
    platformOptions?: string | null
    hashtags?: string | null
    preferredFormat?: string | null
    viewCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DistributionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    ayrsharePostId?: NullableStringFieldUpdateOperationsInput | string | null
    platformPostId?: NullableStringFieldUpdateOperationsInput | string | null
    postUrl?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    platformOptions?: NullableStringFieldUpdateOperationsInput | string | null
    hashtags?: NullableStringFieldUpdateOperationsInput | string | null
    preferredFormat?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publication?: PublicationUpdateOneRequiredWithoutDistributionsNestedInput
  }

  export type DistributionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicationId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    ayrsharePostId?: NullableStringFieldUpdateOperationsInput | string | null
    platformPostId?: NullableStringFieldUpdateOperationsInput | string | null
    postUrl?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    platformOptions?: NullableStringFieldUpdateOperationsInput | string | null
    hashtags?: NullableStringFieldUpdateOperationsInput | string | null
    preferredFormat?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DistributionCreateManyInput = {
    id?: string
    publicationId: string
    platform: string
    status?: string
    ayrsharePostId?: string | null
    platformPostId?: string | null
    postUrl?: string | null
    errorMessage?: string | null
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    postText?: string | null
    mediaUrls?: string | null
    platformOptions?: string | null
    hashtags?: string | null
    preferredFormat?: string | null
    viewCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DistributionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    ayrsharePostId?: NullableStringFieldUpdateOperationsInput | string | null
    platformPostId?: NullableStringFieldUpdateOperationsInput | string | null
    postUrl?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    platformOptions?: NullableStringFieldUpdateOperationsInput | string | null
    hashtags?: NullableStringFieldUpdateOperationsInput | string | null
    preferredFormat?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DistributionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    publicationId?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    ayrsharePostId?: NullableStringFieldUpdateOperationsInput | string | null
    platformPostId?: NullableStringFieldUpdateOperationsInput | string | null
    postUrl?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    platformOptions?: NullableStringFieldUpdateOperationsInput | string | null
    hashtags?: NullableStringFieldUpdateOperationsInput | string | null
    preferredFormat?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AyrshareProfileCreateInput = {
    id?: string
    workspaceId: string
    name: string
    profileKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    publications?: PublicationCreateNestedManyWithoutAyrshareProfileInput
  }

  export type AyrshareProfileUncheckedCreateInput = {
    id?: string
    workspaceId: string
    name: string
    profileKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    publications?: PublicationUncheckedCreateNestedManyWithoutAyrshareProfileInput
  }

  export type AyrshareProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profileKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publications?: PublicationUpdateManyWithoutAyrshareProfileNestedInput
  }

  export type AyrshareProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profileKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publications?: PublicationUncheckedUpdateManyWithoutAyrshareProfileNestedInput
  }

  export type AyrshareProfileCreateManyInput = {
    id?: string
    workspaceId: string
    name: string
    profileKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AyrshareProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profileKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AyrshareProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profileKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DistributionListRelationFilter = {
    every?: DistributionWhereInput
    some?: DistributionWhereInput
    none?: DistributionWhereInput
  }

  export type AyrshareProfileNullableScalarRelationFilter = {
    is?: AyrshareProfileWhereInput | null
    isNot?: AyrshareProfileWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type DistributionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PublicationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    postText?: SortOrder
    mediaUrls?: SortOrder
    mediaUrlsByFormat?: SortOrder
    scheduledAt?: SortOrder
    ayrshareProfileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    postText?: SortOrder
    mediaUrls?: SortOrder
    mediaUrlsByFormat?: SortOrder
    scheduledAt?: SortOrder
    ayrshareProfileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    postText?: SortOrder
    mediaUrls?: SortOrder
    mediaUrlsByFormat?: SortOrder
    scheduledAt?: SortOrder
    ayrshareProfileId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PublicationScalarRelationFilter = {
    is?: PublicationWhereInput
    isNot?: PublicationWhereInput
  }

  export type DistributionCountOrderByAggregateInput = {
    id?: SortOrder
    publicationId?: SortOrder
    platform?: SortOrder
    status?: SortOrder
    ayrsharePostId?: SortOrder
    platformPostId?: SortOrder
    postUrl?: SortOrder
    errorMessage?: SortOrder
    scheduledAt?: SortOrder
    publishedAt?: SortOrder
    postText?: SortOrder
    mediaUrls?: SortOrder
    platformOptions?: SortOrder
    hashtags?: SortOrder
    preferredFormat?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DistributionAvgOrderByAggregateInput = {
    viewCount?: SortOrder
  }

  export type DistributionMaxOrderByAggregateInput = {
    id?: SortOrder
    publicationId?: SortOrder
    platform?: SortOrder
    status?: SortOrder
    ayrsharePostId?: SortOrder
    platformPostId?: SortOrder
    postUrl?: SortOrder
    errorMessage?: SortOrder
    scheduledAt?: SortOrder
    publishedAt?: SortOrder
    postText?: SortOrder
    mediaUrls?: SortOrder
    platformOptions?: SortOrder
    hashtags?: SortOrder
    preferredFormat?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DistributionMinOrderByAggregateInput = {
    id?: SortOrder
    publicationId?: SortOrder
    platform?: SortOrder
    status?: SortOrder
    ayrsharePostId?: SortOrder
    platformPostId?: SortOrder
    postUrl?: SortOrder
    errorMessage?: SortOrder
    scheduledAt?: SortOrder
    publishedAt?: SortOrder
    postText?: SortOrder
    mediaUrls?: SortOrder
    platformOptions?: SortOrder
    hashtags?: SortOrder
    preferredFormat?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DistributionSumOrderByAggregateInput = {
    viewCount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PublicationListRelationFilter = {
    every?: PublicationWhereInput
    some?: PublicationWhereInput
    none?: PublicationWhereInput
  }

  export type PublicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AyrshareProfileWorkspaceIdProfileKeyCompoundUniqueInput = {
    workspaceId: string
    profileKey: string
  }

  export type AyrshareProfileCountOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    name?: SortOrder
    profileKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AyrshareProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    name?: SortOrder
    profileKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AyrshareProfileMinOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    name?: SortOrder
    profileKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DistributionCreateNestedManyWithoutPublicationInput = {
    create?: XOR<DistributionCreateWithoutPublicationInput, DistributionUncheckedCreateWithoutPublicationInput> | DistributionCreateWithoutPublicationInput[] | DistributionUncheckedCreateWithoutPublicationInput[]
    connectOrCreate?: DistributionCreateOrConnectWithoutPublicationInput | DistributionCreateOrConnectWithoutPublicationInput[]
    createMany?: DistributionCreateManyPublicationInputEnvelope
    connect?: DistributionWhereUniqueInput | DistributionWhereUniqueInput[]
  }

  export type AyrshareProfileCreateNestedOneWithoutPublicationsInput = {
    create?: XOR<AyrshareProfileCreateWithoutPublicationsInput, AyrshareProfileUncheckedCreateWithoutPublicationsInput>
    connectOrCreate?: AyrshareProfileCreateOrConnectWithoutPublicationsInput
    connect?: AyrshareProfileWhereUniqueInput
  }

  export type DistributionUncheckedCreateNestedManyWithoutPublicationInput = {
    create?: XOR<DistributionCreateWithoutPublicationInput, DistributionUncheckedCreateWithoutPublicationInput> | DistributionCreateWithoutPublicationInput[] | DistributionUncheckedCreateWithoutPublicationInput[]
    connectOrCreate?: DistributionCreateOrConnectWithoutPublicationInput | DistributionCreateOrConnectWithoutPublicationInput[]
    createMany?: DistributionCreateManyPublicationInputEnvelope
    connect?: DistributionWhereUniqueInput | DistributionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DistributionUpdateManyWithoutPublicationNestedInput = {
    create?: XOR<DistributionCreateWithoutPublicationInput, DistributionUncheckedCreateWithoutPublicationInput> | DistributionCreateWithoutPublicationInput[] | DistributionUncheckedCreateWithoutPublicationInput[]
    connectOrCreate?: DistributionCreateOrConnectWithoutPublicationInput | DistributionCreateOrConnectWithoutPublicationInput[]
    upsert?: DistributionUpsertWithWhereUniqueWithoutPublicationInput | DistributionUpsertWithWhereUniqueWithoutPublicationInput[]
    createMany?: DistributionCreateManyPublicationInputEnvelope
    set?: DistributionWhereUniqueInput | DistributionWhereUniqueInput[]
    disconnect?: DistributionWhereUniqueInput | DistributionWhereUniqueInput[]
    delete?: DistributionWhereUniqueInput | DistributionWhereUniqueInput[]
    connect?: DistributionWhereUniqueInput | DistributionWhereUniqueInput[]
    update?: DistributionUpdateWithWhereUniqueWithoutPublicationInput | DistributionUpdateWithWhereUniqueWithoutPublicationInput[]
    updateMany?: DistributionUpdateManyWithWhereWithoutPublicationInput | DistributionUpdateManyWithWhereWithoutPublicationInput[]
    deleteMany?: DistributionScalarWhereInput | DistributionScalarWhereInput[]
  }

  export type AyrshareProfileUpdateOneWithoutPublicationsNestedInput = {
    create?: XOR<AyrshareProfileCreateWithoutPublicationsInput, AyrshareProfileUncheckedCreateWithoutPublicationsInput>
    connectOrCreate?: AyrshareProfileCreateOrConnectWithoutPublicationsInput
    upsert?: AyrshareProfileUpsertWithoutPublicationsInput
    disconnect?: AyrshareProfileWhereInput | boolean
    delete?: AyrshareProfileWhereInput | boolean
    connect?: AyrshareProfileWhereUniqueInput
    update?: XOR<XOR<AyrshareProfileUpdateToOneWithWhereWithoutPublicationsInput, AyrshareProfileUpdateWithoutPublicationsInput>, AyrshareProfileUncheckedUpdateWithoutPublicationsInput>
  }

  export type DistributionUncheckedUpdateManyWithoutPublicationNestedInput = {
    create?: XOR<DistributionCreateWithoutPublicationInput, DistributionUncheckedCreateWithoutPublicationInput> | DistributionCreateWithoutPublicationInput[] | DistributionUncheckedCreateWithoutPublicationInput[]
    connectOrCreate?: DistributionCreateOrConnectWithoutPublicationInput | DistributionCreateOrConnectWithoutPublicationInput[]
    upsert?: DistributionUpsertWithWhereUniqueWithoutPublicationInput | DistributionUpsertWithWhereUniqueWithoutPublicationInput[]
    createMany?: DistributionCreateManyPublicationInputEnvelope
    set?: DistributionWhereUniqueInput | DistributionWhereUniqueInput[]
    disconnect?: DistributionWhereUniqueInput | DistributionWhereUniqueInput[]
    delete?: DistributionWhereUniqueInput | DistributionWhereUniqueInput[]
    connect?: DistributionWhereUniqueInput | DistributionWhereUniqueInput[]
    update?: DistributionUpdateWithWhereUniqueWithoutPublicationInput | DistributionUpdateWithWhereUniqueWithoutPublicationInput[]
    updateMany?: DistributionUpdateManyWithWhereWithoutPublicationInput | DistributionUpdateManyWithWhereWithoutPublicationInput[]
    deleteMany?: DistributionScalarWhereInput | DistributionScalarWhereInput[]
  }

  export type PublicationCreateNestedOneWithoutDistributionsInput = {
    create?: XOR<PublicationCreateWithoutDistributionsInput, PublicationUncheckedCreateWithoutDistributionsInput>
    connectOrCreate?: PublicationCreateOrConnectWithoutDistributionsInput
    connect?: PublicationWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PublicationUpdateOneRequiredWithoutDistributionsNestedInput = {
    create?: XOR<PublicationCreateWithoutDistributionsInput, PublicationUncheckedCreateWithoutDistributionsInput>
    connectOrCreate?: PublicationCreateOrConnectWithoutDistributionsInput
    upsert?: PublicationUpsertWithoutDistributionsInput
    connect?: PublicationWhereUniqueInput
    update?: XOR<XOR<PublicationUpdateToOneWithWhereWithoutDistributionsInput, PublicationUpdateWithoutDistributionsInput>, PublicationUncheckedUpdateWithoutDistributionsInput>
  }

  export type PublicationCreateNestedManyWithoutAyrshareProfileInput = {
    create?: XOR<PublicationCreateWithoutAyrshareProfileInput, PublicationUncheckedCreateWithoutAyrshareProfileInput> | PublicationCreateWithoutAyrshareProfileInput[] | PublicationUncheckedCreateWithoutAyrshareProfileInput[]
    connectOrCreate?: PublicationCreateOrConnectWithoutAyrshareProfileInput | PublicationCreateOrConnectWithoutAyrshareProfileInput[]
    createMany?: PublicationCreateManyAyrshareProfileInputEnvelope
    connect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
  }

  export type PublicationUncheckedCreateNestedManyWithoutAyrshareProfileInput = {
    create?: XOR<PublicationCreateWithoutAyrshareProfileInput, PublicationUncheckedCreateWithoutAyrshareProfileInput> | PublicationCreateWithoutAyrshareProfileInput[] | PublicationUncheckedCreateWithoutAyrshareProfileInput[]
    connectOrCreate?: PublicationCreateOrConnectWithoutAyrshareProfileInput | PublicationCreateOrConnectWithoutAyrshareProfileInput[]
    createMany?: PublicationCreateManyAyrshareProfileInputEnvelope
    connect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
  }

  export type PublicationUpdateManyWithoutAyrshareProfileNestedInput = {
    create?: XOR<PublicationCreateWithoutAyrshareProfileInput, PublicationUncheckedCreateWithoutAyrshareProfileInput> | PublicationCreateWithoutAyrshareProfileInput[] | PublicationUncheckedCreateWithoutAyrshareProfileInput[]
    connectOrCreate?: PublicationCreateOrConnectWithoutAyrshareProfileInput | PublicationCreateOrConnectWithoutAyrshareProfileInput[]
    upsert?: PublicationUpsertWithWhereUniqueWithoutAyrshareProfileInput | PublicationUpsertWithWhereUniqueWithoutAyrshareProfileInput[]
    createMany?: PublicationCreateManyAyrshareProfileInputEnvelope
    set?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    disconnect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    delete?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    connect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    update?: PublicationUpdateWithWhereUniqueWithoutAyrshareProfileInput | PublicationUpdateWithWhereUniqueWithoutAyrshareProfileInput[]
    updateMany?: PublicationUpdateManyWithWhereWithoutAyrshareProfileInput | PublicationUpdateManyWithWhereWithoutAyrshareProfileInput[]
    deleteMany?: PublicationScalarWhereInput | PublicationScalarWhereInput[]
  }

  export type PublicationUncheckedUpdateManyWithoutAyrshareProfileNestedInput = {
    create?: XOR<PublicationCreateWithoutAyrshareProfileInput, PublicationUncheckedCreateWithoutAyrshareProfileInput> | PublicationCreateWithoutAyrshareProfileInput[] | PublicationUncheckedCreateWithoutAyrshareProfileInput[]
    connectOrCreate?: PublicationCreateOrConnectWithoutAyrshareProfileInput | PublicationCreateOrConnectWithoutAyrshareProfileInput[]
    upsert?: PublicationUpsertWithWhereUniqueWithoutAyrshareProfileInput | PublicationUpsertWithWhereUniqueWithoutAyrshareProfileInput[]
    createMany?: PublicationCreateManyAyrshareProfileInputEnvelope
    set?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    disconnect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    delete?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    connect?: PublicationWhereUniqueInput | PublicationWhereUniqueInput[]
    update?: PublicationUpdateWithWhereUniqueWithoutAyrshareProfileInput | PublicationUpdateWithWhereUniqueWithoutAyrshareProfileInput[]
    updateMany?: PublicationUpdateManyWithWhereWithoutAyrshareProfileInput | PublicationUpdateManyWithWhereWithoutAyrshareProfileInput[]
    deleteMany?: PublicationScalarWhereInput | PublicationScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DistributionCreateWithoutPublicationInput = {
    id?: string
    platform: string
    status?: string
    ayrsharePostId?: string | null
    platformPostId?: string | null
    postUrl?: string | null
    errorMessage?: string | null
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    postText?: string | null
    mediaUrls?: string | null
    platformOptions?: string | null
    hashtags?: string | null
    preferredFormat?: string | null
    viewCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DistributionUncheckedCreateWithoutPublicationInput = {
    id?: string
    platform: string
    status?: string
    ayrsharePostId?: string | null
    platformPostId?: string | null
    postUrl?: string | null
    errorMessage?: string | null
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    postText?: string | null
    mediaUrls?: string | null
    platformOptions?: string | null
    hashtags?: string | null
    preferredFormat?: string | null
    viewCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DistributionCreateOrConnectWithoutPublicationInput = {
    where: DistributionWhereUniqueInput
    create: XOR<DistributionCreateWithoutPublicationInput, DistributionUncheckedCreateWithoutPublicationInput>
  }

  export type DistributionCreateManyPublicationInputEnvelope = {
    data: DistributionCreateManyPublicationInput | DistributionCreateManyPublicationInput[]
  }

  export type AyrshareProfileCreateWithoutPublicationsInput = {
    id?: string
    workspaceId: string
    name: string
    profileKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AyrshareProfileUncheckedCreateWithoutPublicationsInput = {
    id?: string
    workspaceId: string
    name: string
    profileKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AyrshareProfileCreateOrConnectWithoutPublicationsInput = {
    where: AyrshareProfileWhereUniqueInput
    create: XOR<AyrshareProfileCreateWithoutPublicationsInput, AyrshareProfileUncheckedCreateWithoutPublicationsInput>
  }

  export type DistributionUpsertWithWhereUniqueWithoutPublicationInput = {
    where: DistributionWhereUniqueInput
    update: XOR<DistributionUpdateWithoutPublicationInput, DistributionUncheckedUpdateWithoutPublicationInput>
    create: XOR<DistributionCreateWithoutPublicationInput, DistributionUncheckedCreateWithoutPublicationInput>
  }

  export type DistributionUpdateWithWhereUniqueWithoutPublicationInput = {
    where: DistributionWhereUniqueInput
    data: XOR<DistributionUpdateWithoutPublicationInput, DistributionUncheckedUpdateWithoutPublicationInput>
  }

  export type DistributionUpdateManyWithWhereWithoutPublicationInput = {
    where: DistributionScalarWhereInput
    data: XOR<DistributionUpdateManyMutationInput, DistributionUncheckedUpdateManyWithoutPublicationInput>
  }

  export type DistributionScalarWhereInput = {
    AND?: DistributionScalarWhereInput | DistributionScalarWhereInput[]
    OR?: DistributionScalarWhereInput[]
    NOT?: DistributionScalarWhereInput | DistributionScalarWhereInput[]
    id?: StringFilter<"Distribution"> | string
    publicationId?: StringFilter<"Distribution"> | string
    platform?: StringFilter<"Distribution"> | string
    status?: StringFilter<"Distribution"> | string
    ayrsharePostId?: StringNullableFilter<"Distribution"> | string | null
    platformPostId?: StringNullableFilter<"Distribution"> | string | null
    postUrl?: StringNullableFilter<"Distribution"> | string | null
    errorMessage?: StringNullableFilter<"Distribution"> | string | null
    scheduledAt?: DateTimeNullableFilter<"Distribution"> | Date | string | null
    publishedAt?: DateTimeNullableFilter<"Distribution"> | Date | string | null
    postText?: StringNullableFilter<"Distribution"> | string | null
    mediaUrls?: StringNullableFilter<"Distribution"> | string | null
    platformOptions?: StringNullableFilter<"Distribution"> | string | null
    hashtags?: StringNullableFilter<"Distribution"> | string | null
    preferredFormat?: StringNullableFilter<"Distribution"> | string | null
    viewCount?: IntNullableFilter<"Distribution"> | number | null
    createdAt?: DateTimeFilter<"Distribution"> | Date | string
    updatedAt?: DateTimeFilter<"Distribution"> | Date | string
  }

  export type AyrshareProfileUpsertWithoutPublicationsInput = {
    update: XOR<AyrshareProfileUpdateWithoutPublicationsInput, AyrshareProfileUncheckedUpdateWithoutPublicationsInput>
    create: XOR<AyrshareProfileCreateWithoutPublicationsInput, AyrshareProfileUncheckedCreateWithoutPublicationsInput>
    where?: AyrshareProfileWhereInput
  }

  export type AyrshareProfileUpdateToOneWithWhereWithoutPublicationsInput = {
    where?: AyrshareProfileWhereInput
    data: XOR<AyrshareProfileUpdateWithoutPublicationsInput, AyrshareProfileUncheckedUpdateWithoutPublicationsInput>
  }

  export type AyrshareProfileUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profileKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AyrshareProfileUncheckedUpdateWithoutPublicationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    profileKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationCreateWithoutDistributionsInput = {
    id?: string
    title: string
    description?: string | null
    postText?: string | null
    mediaUrls?: string | null
    mediaUrlsByFormat?: string | null
    scheduledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ayrshareProfile?: AyrshareProfileCreateNestedOneWithoutPublicationsInput
  }

  export type PublicationUncheckedCreateWithoutDistributionsInput = {
    id?: string
    title: string
    description?: string | null
    postText?: string | null
    mediaUrls?: string | null
    mediaUrlsByFormat?: string | null
    scheduledAt?: Date | string | null
    ayrshareProfileId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicationCreateOrConnectWithoutDistributionsInput = {
    where: PublicationWhereUniqueInput
    create: XOR<PublicationCreateWithoutDistributionsInput, PublicationUncheckedCreateWithoutDistributionsInput>
  }

  export type PublicationUpsertWithoutDistributionsInput = {
    update: XOR<PublicationUpdateWithoutDistributionsInput, PublicationUncheckedUpdateWithoutDistributionsInput>
    create: XOR<PublicationCreateWithoutDistributionsInput, PublicationUncheckedCreateWithoutDistributionsInput>
    where?: PublicationWhereInput
  }

  export type PublicationUpdateToOneWithWhereWithoutDistributionsInput = {
    where?: PublicationWhereInput
    data: XOR<PublicationUpdateWithoutDistributionsInput, PublicationUncheckedUpdateWithoutDistributionsInput>
  }

  export type PublicationUpdateWithoutDistributionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrlsByFormat?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ayrshareProfile?: AyrshareProfileUpdateOneWithoutPublicationsNestedInput
  }

  export type PublicationUncheckedUpdateWithoutDistributionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrlsByFormat?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ayrshareProfileId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationCreateWithoutAyrshareProfileInput = {
    id?: string
    title: string
    description?: string | null
    postText?: string | null
    mediaUrls?: string | null
    mediaUrlsByFormat?: string | null
    scheduledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    distributions?: DistributionCreateNestedManyWithoutPublicationInput
  }

  export type PublicationUncheckedCreateWithoutAyrshareProfileInput = {
    id?: string
    title: string
    description?: string | null
    postText?: string | null
    mediaUrls?: string | null
    mediaUrlsByFormat?: string | null
    scheduledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    distributions?: DistributionUncheckedCreateNestedManyWithoutPublicationInput
  }

  export type PublicationCreateOrConnectWithoutAyrshareProfileInput = {
    where: PublicationWhereUniqueInput
    create: XOR<PublicationCreateWithoutAyrshareProfileInput, PublicationUncheckedCreateWithoutAyrshareProfileInput>
  }

  export type PublicationCreateManyAyrshareProfileInputEnvelope = {
    data: PublicationCreateManyAyrshareProfileInput | PublicationCreateManyAyrshareProfileInput[]
  }

  export type PublicationUpsertWithWhereUniqueWithoutAyrshareProfileInput = {
    where: PublicationWhereUniqueInput
    update: XOR<PublicationUpdateWithoutAyrshareProfileInput, PublicationUncheckedUpdateWithoutAyrshareProfileInput>
    create: XOR<PublicationCreateWithoutAyrshareProfileInput, PublicationUncheckedCreateWithoutAyrshareProfileInput>
  }

  export type PublicationUpdateWithWhereUniqueWithoutAyrshareProfileInput = {
    where: PublicationWhereUniqueInput
    data: XOR<PublicationUpdateWithoutAyrshareProfileInput, PublicationUncheckedUpdateWithoutAyrshareProfileInput>
  }

  export type PublicationUpdateManyWithWhereWithoutAyrshareProfileInput = {
    where: PublicationScalarWhereInput
    data: XOR<PublicationUpdateManyMutationInput, PublicationUncheckedUpdateManyWithoutAyrshareProfileInput>
  }

  export type PublicationScalarWhereInput = {
    AND?: PublicationScalarWhereInput | PublicationScalarWhereInput[]
    OR?: PublicationScalarWhereInput[]
    NOT?: PublicationScalarWhereInput | PublicationScalarWhereInput[]
    id?: StringFilter<"Publication"> | string
    title?: StringFilter<"Publication"> | string
    description?: StringNullableFilter<"Publication"> | string | null
    postText?: StringNullableFilter<"Publication"> | string | null
    mediaUrls?: StringNullableFilter<"Publication"> | string | null
    mediaUrlsByFormat?: StringNullableFilter<"Publication"> | string | null
    scheduledAt?: DateTimeNullableFilter<"Publication"> | Date | string | null
    ayrshareProfileId?: StringNullableFilter<"Publication"> | string | null
    createdAt?: DateTimeFilter<"Publication"> | Date | string
    updatedAt?: DateTimeFilter<"Publication"> | Date | string
  }

  export type DistributionCreateManyPublicationInput = {
    id?: string
    platform: string
    status?: string
    ayrsharePostId?: string | null
    platformPostId?: string | null
    postUrl?: string | null
    errorMessage?: string | null
    scheduledAt?: Date | string | null
    publishedAt?: Date | string | null
    postText?: string | null
    mediaUrls?: string | null
    platformOptions?: string | null
    hashtags?: string | null
    preferredFormat?: string | null
    viewCount?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DistributionUpdateWithoutPublicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    ayrsharePostId?: NullableStringFieldUpdateOperationsInput | string | null
    platformPostId?: NullableStringFieldUpdateOperationsInput | string | null
    postUrl?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    platformOptions?: NullableStringFieldUpdateOperationsInput | string | null
    hashtags?: NullableStringFieldUpdateOperationsInput | string | null
    preferredFormat?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DistributionUncheckedUpdateWithoutPublicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    ayrsharePostId?: NullableStringFieldUpdateOperationsInput | string | null
    platformPostId?: NullableStringFieldUpdateOperationsInput | string | null
    postUrl?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    platformOptions?: NullableStringFieldUpdateOperationsInput | string | null
    hashtags?: NullableStringFieldUpdateOperationsInput | string | null
    preferredFormat?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DistributionUncheckedUpdateManyWithoutPublicationInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    ayrsharePostId?: NullableStringFieldUpdateOperationsInput | string | null
    platformPostId?: NullableStringFieldUpdateOperationsInput | string | null
    postUrl?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    platformOptions?: NullableStringFieldUpdateOperationsInput | string | null
    hashtags?: NullableStringFieldUpdateOperationsInput | string | null
    preferredFormat?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationCreateManyAyrshareProfileInput = {
    id?: string
    title: string
    description?: string | null
    postText?: string | null
    mediaUrls?: string | null
    mediaUrlsByFormat?: string | null
    scheduledAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicationUpdateWithoutAyrshareProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrlsByFormat?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    distributions?: DistributionUpdateManyWithoutPublicationNestedInput
  }

  export type PublicationUncheckedUpdateWithoutAyrshareProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrlsByFormat?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    distributions?: DistributionUncheckedUpdateManyWithoutPublicationNestedInput
  }

  export type PublicationUncheckedUpdateManyWithoutAyrshareProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    postText?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrlsByFormat?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}