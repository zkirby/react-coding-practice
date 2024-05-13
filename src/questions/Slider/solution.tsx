import { useRef, useState } from "react";
import "./solution.css";

const DEFAULT_PERCENT_FILL = 0.3;
const DEFAULT_SLIDER_WIDTH = 400;

interface SliderProps {
  initialFill?: number;
  width?: number;
}

// --------------------------------------------------------
// --------------- SOLUTION 1: Width ----------------------
// --------------------------------------------------------
export function SliderSol1Width({
  initialFill = DEFAULT_PERCENT_FILL,
  width = DEFAULT_SLIDER_WIDTH,
}: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [percentFill, setPercentFill] = useState(initialFill);

  const handleDrag = (e: React.DragEvent) => {
    const dragX = e.clientX;
    const offsetX = sliderRef.current?.getBoundingClientRect().x || 0;

    const relativeDragX = dragX - offsetX;
    const portionDragged = relativeDragX / width;

    setPercentFill(Math.max(Math.min(portionDragged, 1), 0));
  };

  return (
    <div
      ref={sliderRef}
      className="slider__container"
      style={{ "--slider-width": `${width}px` }}
    >
      <div hidden aria-live="polite">
        {percentFill}% full
      </div>
      <div
        className="slider__right-fill"
        style={{ width: `${percentFill * width}px` }}
      ></div>
      <div
        className="slider__drag-bar"
        draggable
        onDrag={handleDrag}
        onDragEnd={handleDrag}
      ></div>
    </div>
  );
}

// --------------------------------------------------------
// --------------- SOLUTION 2: Transform ------------------
// --------------------------------------------------------
export function SliderSol2Transform({
  initialFill = DEFAULT_PERCENT_FILL,
  width = DEFAULT_SLIDER_WIDTH,
}: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [percentFill, setPercentFill] = useState(initialFill);

  const handleDrag = (e: React.DragEvent) => {
    const dragX = e.clientX;
    const offsetX = sliderRef.current?.getBoundingClientRect().x || 0;

    const relativeDragX = dragX - offsetX;
    const portionDragged = relativeDragX / width;

    setPercentFill(Math.max(Math.min(portionDragged, 1), 0));
  };

  return (
    <div
      className="slider__container"
      ref={sliderRef}
      style={{ "--slider-width": `${width}px` }}
    >
      <div hidden aria-live="polite">
        {percentFill}% full
      </div>
      <div
        className="slider__right-fill"
        style={{
          transform: `scaleX(${percentFill})`,
          transformOrigin: "left",
        }}
      ></div>
      <div
        className="slider__drag-bar"
        draggable
        style={{
          left: `${percentFill * 100}%`,
          position: "absolute",
        }}
        onDrag={handleDrag}
        onDragEnd={handleDrag}
      ></div>
    </div>
  );
}
