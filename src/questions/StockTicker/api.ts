import { maybe, random, sleep } from "../../utils";

interface Price {
  /**
   * value between 0 and 100 representing the price of the stock.
   */
  value: number;
}

let price;

export default {
  async getPrice(maxPrice: number): Promise<Price> {
    await sleep(random(100, 600));

    if (maybe(30)) throw new Error("API Error");

    price ??= random(0, maxPrice);
    const dx = random(0, 10) * (maybe() ? 1 : -1);
    price = Math.min(Math.max(0, price + dx), maxPrice);

    return { value: price };
  },
};
