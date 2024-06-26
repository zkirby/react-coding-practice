import { useState } from "react";
import "./solution.css";

interface TextHighlightProps {
  text: string; // arbitrary length
}

const COLORS = ["red", "green", "blue"] as const;
const COLOR_BUTTON_HEIGHT = 20;
const COLOR_BUTTON_SPACING = 8;

interface Selection {
  color: (typeof COLORS)[number];
  rect: DOMRect;
  text: string;
}

export default function TextHighlight({ text }: TextHighlightProps) {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [popupPos, setPopupPos] = useState<DOMRect | null>(null);

  const handleSelect = () => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    setPopupPos(range?.getBoundingClientRect() ?? null);
  };

  const handleColorSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    const color = e.currentTarget.innerText as (typeof COLORS)[number];

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const clientRects = Object.values(range?.getClientRects() ?? {});

    setSelections((s) => [
      ...s,
      ...clientRects.map((rect) => ({ color, rect, text: range!.toString() })),
    ]);

    setPopupPos(null);
  };

  const popupHeight =
    COLORS.length * COLOR_BUTTON_HEIGHT + COLOR_BUTTON_SPACING * 2 + 20;

  return (
    <div className="thl__container">
      {popupPos && (
        <div
          className="thl__color-popup"
          style={{
            "--btn-height": `${COLOR_BUTTON_HEIGHT}px`,
            padding: `${COLOR_BUTTON_SPACING}px`,
            rowGap: `${COLOR_BUTTON_SPACING}px`,
            top: popupPos.top - popupHeight,
            left: popupPos.left,
          }}
        >
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={handleColorSelect}
              style={{ color: c, borderColor: c }}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <p onMouseUp={handleSelect}>{text}</p>
      {selections.map((s) => (
        <mark
          className="thl__selection"
          style={{
            backgroundColor: s.color,
            left: s.rect.left,
            top: s.rect.top,
            width: s.rect.width,
            height: s.rect.height,
          }}
        >
          <span hidden>{s.text}</span>
        </mark>
      ))}
    </div>
  );
}
