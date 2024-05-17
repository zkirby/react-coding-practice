import { ChangeEvent, FormEvent, useState } from "react";
import "./solution.css";

interface Row {
  A: string;
  B: string;
  C: string;
  checked: boolean;
}

export default function TableSelect() {
  const [rows, setRows] = useState<Row[]>([]);

  const addElement = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    setRows((r) => [
      ...r,
      {
        A: form.get("A") as string,
        B: form.get("B") as string,
        C: form.get("C") as string,
        checked: false,
      },
    ]);
    e.currentTarget.reset();
  };

  const toggleDeleteAll = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setRows((prevRows) =>
      prevRows.map((row) => ({ ...row, checked: checked }))
    );
  };

  const deletedChecked = () => {
    if (
      window.confirm(`Are you sure you want to delete ${rows.length} rows?`)
    ) {
      setRows((prevRows) => prevRows.filter((row) => !row.checked));
    }
  };

  const toggleCheckForId = (id: number) => {
    const row = rows[id];
    setRows(rows.with(id, { ...row, checked: !row.checked }));
  };

  const anyToDelete = rows.some((r) => r.checked);
  const allChecked = !!(rows.length && rows.every((r) => r.checked));

  return (
    <div className="ts__container">
      <div className="ts__left-panel">
        {anyToDelete && (
          <button onClick={deletedChecked} type="button">
            Delete {allChecked ? "All" : ""}
          </button>
        )}

        {/* Table */}
        <table className="ts__table">
          <thead>
            <th>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={toggleDeleteAll}
                aria-label="select all rows"
              />
            </th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
          </thead>
          <tbody>
            {rows.map((r, idx) => {
              return (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={r.checked}
                      onChange={() => toggleCheckForId(idx)}
                      aria-label={`select row ${idx}`}
                    />
                  </td>
                  <td>{r.A}</td>
                  <td>{r.B}</td>
                  <td>{r.C}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create Element Form */}
      <form className="ts__form" onSubmit={addElement}>
        <label>
          <span>A</span>
          <input type="text" name="A" required />
        </label>
        <label>
          <span>B</span>
          <input type="text" name="B" required />
        </label>
        <label>
          <span>C</span>
          <input type="text" name="C" required />
        </label>

        <button type="submit">Add Row</button>
      </form>
    </div>
  );
}
