import { useState } from "react";
import "./solution.css";

interface Cell<T = unknown> {
  type: "header" | "display" | "filter" | "aggregate";
  output: T[];
}

type Rows = (string | number)[][];

/** The notebook container */
export default function Notebook() {
  const [cells, setCells] = useState<Cell<Rows>[]>([]);

  const addCell = () => {
    // pass
  };

  const onUpdate = (id, transform) => {
    // update parameters
    // Cascading update all values
    // find id position.
    // starting from that position, update all cell values.
  };

  return (
    <div>
      {/* Cells */}

      {/* Add Cell */}
      <button onClick={addCell} type="button">
        +
      </button>
    </div>
  );
}

const HeaderCell = () => {
  const [text, setText] = useState();
  return <div>{text}</div>;
};

function FilterCell({ onUpdate }) {}

function DisplayCell({
  input,
  columns,
}: {
  input: (number | string)[][];
  columns: string[];
}) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((c) => (
            <td>{c}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {input.map((r) => {
          return (
            <tr>
              {r.map((c) => (
                <td>{c}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
