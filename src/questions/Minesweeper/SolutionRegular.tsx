import { useCallback, useState } from "react";
import "./solution.css";

const TILES = { BOMB: "X", HIDDEN: "_", BLANK: "0", FLAG: "⛳", MARK: "?" };
const SURROUNDING_CORDS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const clsx = (...cns: (string | boolean)[]) => cns.filter(Boolean).join(" ");

/**
 * Create a new game board
 * EX: ['1', 'X', ..., '0']
 */
const createBoard = ({
  dim,
  numBombs,
}: {
  dim: number;
  numBombs: number;
}): string[] => {
  const board = Array.from({ length: dim * dim }, () => TILES.BLANK);
  const randomCoord = () => Math.floor(Math.random() * dim);

  for (let i = 0; i < numBombs; i++) {
    // Get first non-bomb random coordinates
    const { row, col } = (() => {
      let row, col;
      do {
        row = randomCoord();
        col = randomCoord();
      } while (board[col + row * dim] === TILES.BOMB);
      return { row, col };
    })();

    // Set to a bomb
    board[col + row * dim] = TILES.BOMB;

    // Increment surrounding tiles
    SURROUNDING_CORDS.forEach(([xOffset, yOffset]) => {
      // Prevent wrapping since it's a 1-dim array
      if (col + yOffset < 0 || col + yOffset > dim - 1) return;
      if (row + xOffset < 0 || row + xOffset > dim - 1) return;

      const pos = col + yOffset + (row + xOffset) * dim;
      if (board[pos] === TILES.BOMB) return;

      board[pos] = `${parseInt(board[pos]) + 1}`;
    });
  }

  return board;
};

/**
 * Reveals the appropriate tiles on the game board
 * given the location of a click. Mutates `state`.
 *
 * Ex:
 * === game board ====
 * ['1', 'X', '1',
 *  '1', '1', '1',
 *  '0', '0', '0']
 *
 * === board state ===
 * ['_', '_', '_',
 *  '_', '_', '_'
 *  '_', '_', '_']
 *
 * === click coord ===
 * X: 2, Y: 0
 *
 * ::: result board state :::
 *  ['_', '_', '_',
 *  '1', '1', '1'
 *  '0', '0', '0']
 */
const revealTiles = ({
  board,
  state,
  click,
}: {
  board: string[];
  state: string[];
  click: { row: number; col: number };
}): string[] => {
  // Perform BFS on the graph to reveal tiles.
  const visited = new Set();
  const queue = [click];
  const nextState = [...state];
  const dim = Math.sqrt(board.length);

  while (queue.length) {
    const { row, col } = queue.pop()!;
    // Prevent wrapping since it's a 1-dim array
    if (col < 0 || col > dim - 1) continue;
    if (row < 0 || row > dim - 1) continue;

    const pos = col + row * dim;
    if (visited.has(pos)) continue;
    else visited.add(pos);

    nextState[pos] = board[pos];

    // Don't traverse the children if it's not a blank tile (otherwise it might be bomb!)
    // This is also how traditional minesweeper reveal mechanism works
    if (board[pos] === TILES.BLANK) {
      const children = SURROUNDING_CORDS.map(([xOffset, yOffset]) => ({
        row: row + xOffset,
        col: col + yOffset,
      }));
      queue.unshift(...children);
    }
  }
  return nextState;
};

function Cell({
  content,
  onClick,
  onFlag,
}: {
  content: string;
  onClick: () => void;
  onFlag: () => void;
}) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (e.type === "contextmenu" ? onFlag : onClick)();
  };

  return (
    <button
      type="button"
      aria-label="show cell"
      onClick={handleClick}
      onContextMenu={handleClick}
      className={clsx(
        content === TILES.BLANK && "ms__blank-tile",
        content === TILES.BOMB && "ms__bomb-tile",
        content === TILES.HIDDEN && "ms__hidden-tile",
        "ms__tile"
      )}
    >
      {content === TILES.HIDDEN ? null : content}
    </button>
  );
}

export default function Minesweeper({
  dim = 9,
  numBombs = 10,
}: {
  dim?: number;
  numBombs?: number;
}) {
  const [board, setBoard] = useState(createBoard({ dim, numBombs }));
  const [visible, setVisibleTiles] = useState(
    Array.from({ length: dim * dim }, () => TILES.HIDDEN)
  );

  const handleClick = useCallback(
    (cellId: number) => {
      setVisibleTiles((t) =>
        revealTiles({
          board,
          state: t,
          click: { row: Math.floor(cellId / dim), col: cellId % dim },
        })
      );
    },
    [board]
  );

  const handleFlag = useCallback((cellId: number) => {
    setVisibleTiles((t) =>
      t.with(cellId, t[cellId] === TILES.FLAG ? TILES.HIDDEN : TILES.FLAG)
    );
  }, []);

  const reset = () => {
    setBoard(createBoard({ dim, numBombs }));
    setVisibleTiles((t) => t.fill(TILES.HIDDEN));
  };

  // Are any bombs now visible?
  const didLose = visible.some((t) => t === TILES.BOMB);

  // Are all of the bombs flagged?
  const didWin = visible.every((t, idx) =>
    board[idx] === TILES.BOMB ? t === TILES.FLAG : true
  );

  const numFlags = visible.filter((v) => v === TILES.FLAG).length;

  return (
    <div>
      {/* Stats */}
      <div aria-live="polite">Flags Left: {numBombs - numFlags}</div>

      <hr />

      {/* Game board */}
      <div
        className="ms__game-area"
        style={{
          // @ts-expect-error fix css vars in js
          "--grid-dim": dim,
        }}
      >
        {visible.map((cell, cellId) => (
          <Cell
            key={`${cellId}`}
            content={cell}
            onClick={() => handleClick(cellId)}
            onFlag={() => handleFlag(cellId)}
          />
        ))}
      </div>

      <hr />

      {/* Game ending conditions */}
      {(didLose || didWin) && (
        <div>
          <span aria-live="polite">You {didLose ? "Lost" : "Won"}...</span>{" "}
          <button onClick={reset}>Reset?</button>
        </div>
      )}
    </div>
  );
}
