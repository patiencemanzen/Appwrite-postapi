/**
 * Creating a random ID
 *
 * @param {Int} length
 * @returns
 */
export const randomId = (length = 6) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

/**
 * Creating a random ID by Intenger
 *
 * @param {Int} length
 * @returns
 */
export const randomIdByInt = () => {
  return Math.floor(Math.random() * 16);
};

export const slugify = (string, separator = "-") => {
  return string
    .toString()
    .normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, separator);
};

/**
 * Wraps the imperative try-catch statement in a function and
 * returns a tuple of results and an error.
 *
 * @param tryer
 * @returns {Array}
 */
export const tryCatch = (tryer) => {
  try {
    return tryer();
  } catch (error) {
    this.$root.$emit("new_message", {
      responseType: "error",
      response: error.message,
      hasResponse: true,
    });
  }
};
