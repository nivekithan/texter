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
