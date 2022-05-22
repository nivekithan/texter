/**
 * Gets the environment variable from `process.env`, if there is no
 * variable with that name throws error
 *
 * @param name - Environment variable name
 * @returns The environment variable value
 *
 * @example
 * ```ts
 * const available = getEnvVar("AVAILABLE_VAR"); // Returns value in string
 * const notAvailable = getEnvVar("NOT_AVAILABLE_VAR"); // throws Error("Environment variable NOT_AVAILABLE_VAR is not defined")
 * ```
 */
export const getEnvVar = (name: string) => {
  const value = process.env[name];

  if (value === undefined) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value;
};

type InvariantType = (
  condition: unknown,
  message: string | (() => string)
) => asserts condition;

/**
 * Function which asserts the condition to be true, if not throws with
 * message passed as second argument. helpful in narrowing down the type
 *
 * @example
 * ```ts
 * const boo : string | null = null;
 * const foo : string | null = "foo";
 *
 * invariant(boo, "boo is null"); // throw Error("boo is null");
 * invariant(foo); // Will not throw
 *
 * const firstChar = foo.charAt(0); // type of foo is narrowed to string
 * ```
 *
 * @param condition - Condition to check
 * @param message - Message to show when the condition fails
 * @returns
 */
export const invariant: InvariantType = (
  condition: unknown,
  message: string | (() => string) = "Invariant failed"
): asserts condition => {
  if (condition) {
    return;
  }

  const errorMessage = typeof message === "string" ? message : message();

  throw new Error(errorMessage);
};
