import { memo, useState } from "react";

import table from "./table.json";

const Cell = ({
  initialCellValue,
  readOnlyUpdate,
}: {
  initialCellValue: string;
  readOnlyUpdate: (value: string) => void;
}) => {
  const [value, setValue] = useState(initialCellValue);

  const update = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setValue(newValue);
    readOnlyUpdate(newValue);
  };

  return (
    <td>
      <input value={value} type="text" onChange={update} />
    </td>
  );
};

const Table = memo(
  ({
    update,
  }: {
    update: React.Dispatch<React.SetStateAction<string[][]>>;
  }) => {
    const updateRow = (
      value: string,
      { rowId, colId }: { rowId: number; colId: number }
    ) => update((rows) => rows.with(rowId, rows[rowId].with(colId, value)));

    return (
      <table>
        <thead>
          <tr>
            {table.columns.map((c) => (
              <th>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowId) => (
            <tr>
              {row.map((defaultVal, colId) => (
                <Cell
                  key={`${rowId}-${colId}`}
                  initialCellValue={defaultVal}
                  readOnlyUpdate={(value) => updateRow(value, { rowId, colId })}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
);

export default function TableEdit() {
  const [rows, setRows] = useState(table.rows);

  const print = () => {
    console.log(table.columns.join(", "));
    rows.forEach((row) => {
      console.log(row.join(", "));
    });
  };

  return (
    <main>
      <button onClick={print} type="button">
        Print Table To Console
      </button>
      <Table update={setRows} />
    </main>
  );
}
