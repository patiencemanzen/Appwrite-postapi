import moment from "moment";

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
export const tryCatch = (tryer, fallback) => {
  try {
    return tryer();
  } catch (error) {
    if (fallback !== undefined && fallback instanceof Function)
      return fallback(error);
  }
};

/**
 * Get string and return First Charactor on each
 *
 * @param {String} string
 * @returns {String}
 */
export const getInitials = (string) => {
  if (string) {
    var names = string.split(" "),
      initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials.toUpperCase();
  }
};

/**
 * Check if given obj is null|empty
 *
 * @param {Object} obj
 * @returns {Boolean}
 */
export const isEmpty = (obj) => {
  return Object.entries(obj).length === 0 ? true : false;
};

/**
 * Format the date in human readable diff format
 *
 * @param {String} date
 * @returns {String}
 */
export const diffFromHuman = (date) => {
  return moment(date).fromNow();
};
