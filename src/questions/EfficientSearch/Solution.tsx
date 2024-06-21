import { useCallback, useRef, useState } from "react";

interface SearchProps<T> {
  items: T[];
  accessor: string;
  strategy: "throttle" | "debounce" | "blur";
}

function Search<T extends { [key: string]: string }>({
  items,
  accessor,
  strategy,
}: SearchProps<T>) {
  const [searchString, setSearchString] = useState<string>("");
  const [term, setTerm] = useState<string>();

  const debouncedSearch = useDebounce((s: string) => setTerm(s));
  const throttleSearch = useThrottle((s: string) => setTerm(s));

  const filtered = items.filter((t) => !term || t[accessor].startsWith(term));

  const renderInput = () => {
    if (strategy === "blur") {
      const sync = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.currentTarget.value);
      };
      const update = (e: React.FocusEvent<HTMLInputElement>) => {
        setTerm(e.currentTarget.value);
      };

      return (
        <input
          value={searchString}
          onBlur={update}
          onChange={sync}
          placeholder="search..."
        />
      );
    }

    if (strategy === "debounce") {
      const sync = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.currentTarget.value);
        debouncedSearch(e.currentTarget.value);
      };

      return (
        <input value={searchString} onChange={sync} placeholder="search..." />
      );
    }

    if (strategy === "throttle") {
      const sync = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.currentTarget.value);
        throttleSearch(e.currentTarget.value);
      };

      return (
        <input value={searchString} onChange={sync} placeholder="search..." />
      );
    }
  };

  return (
    <div>
      {renderInput()}
      {filtered.map((t) => {
        return <div>{t[accessor]}</div>;
      })}
    </div>
  );
}

export default function UseSearch() {
  const items = [
    {
      a: "the big lebowski",
    },
    {
      a: "the last dance",
    },
    {
      a: "there are more",
    },
    {
      a: "the thing about it",
    },
    {
      a: "timing is everything",
    },
    {
      a: "not related",
    },
    {
      a: "the thing",
    },
    {
      a: "thinking out loud",
    },
  ];

  return <Search items={items} accessor="a" strategy="throttle" />;
}

/** Debounce a function */
function useDebounce<T>(fn: (...args: T[]) => void, ms = 1000) {
  const timeout = useRef<number>();
  return useCallback(
    (...args: T[]) => {
      console.log(args);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => fn(...args), ms);
    },
    [fn, ms]
  );
}

/** Throttle a function */
function useThrottle<T>(fn: (...args: T[]) => void, ms = 1000) {
  const timeout = useRef<number>();
  const waiting = useRef(false);
  const lastArgs = useRef<T[] | null>(null);

  return useCallback(
    (...args: T[]) => {
      if (waiting.current) {
        lastArgs.current = args;
        return;
      }

      fn(...args);

      clearTimeout(timeout.current);
      waiting.current = true;

      timeout.current = setTimeout(() => {
        if (lastArgs.current) {
          fn(...lastArgs.current);
          lastArgs.current = null;
        }
        waiting.current = false;
      }, ms);
    },
    [fn, ms]
  );
}
