/** halt execution for `ms` milliseconds */
export const sleep = (ms: number = 300) =>
  new Promise((res) => setTimeout(res, ms));

/** random number between `max` and `min` */
export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Return true with probability `p`
 * @param p whole number 0 - 100 representing a probability
 */
export const maybe = (p: number = 50) => random(0, 100) <= p;
