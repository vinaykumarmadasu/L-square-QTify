
/**
 * Truncate a string to a specified length and append '...' if it exceeds that length.
 *
 * @param {string} str - The string to truncate.
 * @param {number} num - The maximum length of the string.
 * @returns {string} - The truncated string.
 */
export const truncate = (str, num) => {
    if (str.length <= num) return str; // If the string is shorter than the limit, return it as is
    return str.slice(0, num) + '...'; // Truncate and add ellipsis
  };
  