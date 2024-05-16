import { sleep } from "../../utils";

const dict = [
  {
    word: "blossom",
    color: "#5FBA7D",
  },
  {
    word: "whisper",
    color: "#D5D15F",
  },
  {
    word: "courage",
    color: "#A75D70",
  },
  {
    word: "sunshine",
    color: "#FBB04B",
  },
  {
    word: "laughter",
    color: "#5D68A7",
  },
  {
    word: "harmony",
    color: "#F58A5E",
  },
  {
    word: "brilliant",
    color: "#76B0D3",
  },
  {
    word: "serenity",
    color: "#B1C971",
  },
  {
    word: "wanderlust",
    color: "#C7A5D5",
  },
  {
    word: "twilight",
    color: "#B39A6B",
  },
  {
    word: "glimmer",
    color: "#F19090",
  },
  {
    word: "tranquil",
    color: "#76C6E5",
  },
  {
    word: "breeze",
    color: "#FAB07E",
  },
  {
    word: "sapphire",
    color: "#5B69A9",
  },
  {
    word: "enchantment",
    color: "#D289BF",
  },
  {
    word: "whimsical",
    color: "#65A4C2",
  },
  {
    word: "sparkle",
    color: "#F59C8A",
  },
  {
    word: "delight",
    color: "#70D59D",
  },
  {
    word: "golden",
    color: "#E9C24A",
  },
  {
    word: "dawn",
    color: "#F29F7D",
  },
  {
    word: "misty",
    color: "#B2D8C6",
  },
  {
    word: "serendipity",
    color: "#D5A9D3",
  },
  {
    word: "magnificent",
    color: "#AEBD63",
  },
  {
    word: "lullaby",
    color: "#E09EAE",
  },
  {
    word: "graceful",
    color: "#F29F9F",
  },
  {
    word: "vibrant",
    color: "#6AB4D6",
  },
  {
    word: "radiant",
    color: "#E5AD7B",
  },
  {
    word: "cosmic",
    color: "#A978D1",
  },
  {
    word: "bountiful",
    color: "#B9D86C",
  },
];

const WINDOW_SIZE = 10;

export default {
  async getWindows({ cursor = "0" }: { cursor?: string } = { cursor: "0" }) {
    await sleep(600);

    const start = parseInt(cursor);

    return {
      items: dict.slice(start, start + WINDOW_SIZE),
      nextCursor: `${(start + WINDOW_SIZE) % dict.length}`,
      prevCursor: `${(start - WINDOW_SIZE) % dict.length}`,
    };
  },
};
