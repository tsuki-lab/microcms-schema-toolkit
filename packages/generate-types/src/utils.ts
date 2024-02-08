/**
 * convert to camelCase
 * @param {string} str text
 * @return {string} sampleString
 */
export const camelCase = (str: string): string => {
  str = str.charAt(0).toLowerCase() + str.slice(1);
  return str.replace(/[-_](.)/g, (match, group1) => {
    return group1.toUpperCase();
  });
};

/**
 * convert to PascalCase
 * @param {string} str text
 * @return {string} SampleString
 */
export const pascalCase = (str: string): string => {
  const camel = camelCase(str);
  return camel.charAt(0).toUpperCase() + camel.slice(1);
};

/**
 * check if the string is a kebab-case
 * @param {string} str text
 * @return {boolean} true if kebab-case
 */
export const isKebabCase = (str: string): boolean => {
  return str.includes('-');
};
