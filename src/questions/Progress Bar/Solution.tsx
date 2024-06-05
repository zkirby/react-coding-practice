import { useCallback, useEffect, useState } from "react";

import "./solution.css";

/** Create a classname string */
const clsx = (...names: (string | boolean)[]) =>
  names.filter(Boolean).join(" ");

/** Progress bar */
function Progress({
  active,
  onFinished,
}: {
  active: boolean;
  onFinished: () => void;
}) {
  const [localActive, setActive] = useState(false);
  useEffect(() => setActive(active), [active]);

  return (
    <div className="bar" role="progressbar">
      <div
        className={clsx("bar-inner", localActive ? "active" : "")}
        onTransitionEnd={onFinished}
      />
    </div>
  );
}

/** Render a list of progress bars */
export default function ProgressBar() {
  const [numBars, setNumBars] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);

  const onAddBar = () => setNumBars(numBars + 1);
  const onFinished = useCallback(() => setCurrentBar((b) => b + 1), []);

  return (
    <div>
      {/* Bars */}
      {Array.from({ length: numBars }, (_, id) => {
        return (
          <Progress
            key={id}
            onFinished={onFinished}
            active={id <= currentBar}
          />
        );
      })}

      <button type="button" onClick={onAddBar}>
        Add bar
      </button>
    </div>
  );
}
