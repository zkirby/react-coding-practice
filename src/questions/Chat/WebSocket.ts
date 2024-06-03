import { sleep } from "../../utils";

const wordDict = {
  subjects: [
    "The cat",
    "A dog",
    "The bird",
    "A man",
    "The woman",
    "The child",
    "A teacher",
    "The student",
  ],
  verbs: [
    "jumps",
    "runs",
    "flies",
    "eats",
    "sleeps",
    "writes",
    "reads",
    "sings",
  ],
  objects: [
    "the fence",
    "the road",
    "the sky",
    "the food",
    "the bed",
    "a letter",
    "a book",
    "a song",
  ],
  adjectives: [
    "quickly",
    "slowly",
    "happily",
    "sadly",
    "angrily",
    "eagerly",
    "gracefully",
    "lazily",
  ],
  adverbs: [
    "in the morning",
    "at night",
    "during the day",
    "in the evening",
    "on the weekend",
    "at noon",
    "at sunrise",
    "at sunset",
  ],
};

type OpenCB = () => void;
type MessageCB = (s: { id: number; text: string }) => void;

type CallBacks = {
  message: MessageCB[];
  open: OpenCB[];
};
type Topic = keyof CallBacks;

/** id helper */
class Id {
  private static _id: number = 0;
  static get current() {
    return this._id++;
  }
}

/** simulates a websocket */
export default class Websocket {
  /** event bus */
  private _cbs: CallBacks = {
    message: [],
    open: [],
  };

  constructor() {
    setTimeout(() => {
      this._cbs.open.forEach((cb) => cb());
    }, 1000);
  }

  addEventListener(event: Topic, cb: CallBacks[Topic][number]) {
    /// @ts-expect-error fix typing
    this._cbs[event].push(cb);
  }

  removeEventListener(event: Topic, cb: CallBacks[Topic][number]) {
    /// @ts-expect-error fix typing
    this._cbs[event] = this._cbs[event].filter((c) => c !== cb);
  }

  private _broadcast(message: Parameters<MessageCB>[0]) {
    this._cbs.message.forEach((cb) => cb(message));
  }

  /** Send a websocket message */
  async send(message: string) {
    if (!message) {
      throw new Error("Did not receive a message to send");
    }

    // Immediately resend the message back to any other consumers
    this._broadcast({ text: message, id: Id.current });

    const minWords = 5;
    const maxWords = 50;
    const length =
      Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;

    const parts = [
      "subjects",
      "verbs",
      "objects",
      "adjectives",
      "adverbs",
    ] as const;

    // send back a random assortment of words to mimic
    // a websocket.
    const id = Id.current;
    for (let i = 0; i < length; i++) {
      const category = random(parts);
      const words = wordDict[category];

      const randomWord = random(words);
      const token = (i === 0 ? randomWord : randomWord.toLowerCase()) + " ";

      await sleep(100);
      this._broadcast({ text: token, id });
    }
  }
}

/** pick a random element from the list */
const random = <T extends ReadonlyArray<string>>(list: T): T[number] =>
  list[Math.floor(Math.random() * list.length)];
