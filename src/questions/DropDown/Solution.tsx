import { useEffect, useRef, useState } from "react";

import "./solution.css";

interface Option {
  label: string;
  value: string | Option[];
}

interface DropDownProps {
  label: string;
  options: Option[];
  onSelect: (s: string) => void;
}

function DropDown({ options, label, onSelect }: DropDownProps) {
  const [show, setShow] = useState(true);
  const [pos, setPost] = useState({ left: 0, top: 0 });
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bounding = labelRef.current?.getBoundingClientRect();
    setPost({ left: bounding?.left ?? 0, top: bounding?.top ?? 0 });
  }, []);

  return (
    <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div ref={labelRef} className="dropdown__label">
        {label}
      </div>

      <div
        className="dropdown"
        data-hidden={!show}
        style={{
          top: `${pos.top + 10}px`,
          left: `${pos.left + 50}px`,
        }}
      >
        {options.map((o) => {
          const hasMore = Array.isArray(o.value);
          if (hasMore) {
            return (
              <div>
                <DropDown
                  label={o.label}
                  options={o.value as Option[]}
                  onSelect={onSelect}
                />
              </div>
            );
          }
          return (
            <div
              data-selectable={true}
              onClick={() => onSelect(o.value as string)}
            >
              {o.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function UseDropDown() {
  const options = [
    {
      label: "movies",
      value: [
        {
          label: "favorites",
          value: [
            {
              label: "westerns",
              value: [
                {
                  label: "no country for old men",
                  value: "ncfom",
                },
                {
                  label: "the good the bad the ugly",
                  value: "tgtbtu",
                },
              ],
            },
          ],
        },
        {
          label: "okay",
          value: [{ label: "cars 3", value: "c3" }],
        },
        {
          label: "bad",
          value: [
            {
              label: "movie 43",
              value: "m43",
            },
          ],
        },
      ],
    },
    {
      label: "directors",
      value: [
        {
          label: "paul",
          value: "pta",
        },
        {
          label: "noah",
          value: "nb",
        },
      ],
    },
    {
      label: "other",
      value: "other",
    },
  ];

  return (
    <DropDown
      options={options}
      label="Select something"
      onSelect={(s) => console.log(s)}
    />
  );
}
