import { useCallback, useEffect, useRef, useState } from "react";
import api from "./api";

import "./solution.css";

const MAX_TIME = 20; // x-axis
const MAX_PRICE = 30;

// TODO: fix axises
// TODO: Need to account for time becoming greater than 50 (sliding window)
export default function StockTicker() {
  const current = useRef(0);
  const [currentTime, setTime] = useState(0);
  const [prices, addPrice] = useWindowState([] as number[], MAX_TIME);

  useEffect(() => {
    let ignore = false;

    async function getNextPrice(id: number) {
      try {
        const next = (await api.getPrice(MAX_PRICE)).value;

        if (ignore || id !== current.current) {
          return;
        }

        if (next) {
          addPrice(next);
          setTime((t) => t + 1);
        }
      } catch (e) {
        // ignore
      }
    }
    const interval = setInterval(() => {
      const id = ++current.current;
      getNextPrice(id);
    }, 300);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="st__wrapper"
      style={{
        /// @ts-expect-error fix
        "--x-axis": MAX_TIME,
        "--y-axis": MAX_PRICE,
      }}
    >
      {/* Y-axis */}
      <div className="yaxis">
        {Array.from({ length: MAX_PRICE }, (_, idx) => {
          return <div className="yaxis__label">{MAX_PRICE - idx}</div>;
        })}
      </div>

      {/* Body */}
      <div className="st__body">
        {prices.map((price, idx) => {
          const y = MAX_PRICE - price + 1;
          const x = idx + 1;
          return (
            <div
              className="st__item"
              style={{
                gridArea: `${y} / ${x}`,
              }}
            />
          );
        })}
      </div>

      {/* X-axis */}
      <div className="xaxis">
        {Array.from({ length: MAX_TIME }, (_, idx) => {
          const dx = Math.max(currentTime - MAX_TIME, 1);
          return <div className="xaxis__label">{idx + dx}</div>;
        })}
      </div>
    </div>
  );
}

/** Returns a state variable that is a queue of size at most `maxSize` */
function useWindowState<T>(
  initial: T[],
  maxSize: number
): [T[], (item: T) => void] {
  const [queue, setQueue] = useState(initial);

  const add = useCallback(
    (item: T) =>
      setQueue((prevQueue) => {
        const q = [...prevQueue, item];
        if (q.length > maxSize) q.shift();
        return q;
      }),
    [maxSize]
  );

  return [queue, add];
}
