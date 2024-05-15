import { useEffect, useState } from "react";

import api from "./api";
import "./solution.css";

const IMAGE_WIDTH = 500;
const IMAGE_HEIGHT = 300;

export default function Carousel() {
  const [images, setImages] = useState<string[]>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    async function loadImages() {
      const imgs = await api.getImages();
      setImages(imgs);
    }
    loadImages();
  }, []);

  const next = () =>
    setSelected(selected + 1 > images.length - 1 ? 0 : selected + 1);
  const prev = () =>
    setSelected(selected - 1 < 0 ? images.length - 1 : selected - 1);

  return (
    <div
      className="carousel__wrapper"
      style={{
        "--img-width": `${IMAGE_WIDTH}px`,
        "--img-height": `${IMAGE_HEIGHT}px`,
      }}
    >
      {/* Body */}
      <div className="carousel__image-body">
        <button onClick={prev} className="carousel__image-body__control">
          &lt;
        </button>
        {/* Images */}
        <div className="carousel__image-body__viewer">
          {images.map((src) => (
            <img
              src={src}
              style={{
                transform: `translateX(-${selected * IMAGE_WIDTH}px)`,
              }}
            />
          ))}
        </div>
        <button onClick={next} className="carousel__image-body__control">
          &gt;
        </button>
      </div>

      {/* Bubbles */}
      <div className="carousel__bubbles">
        {Array.from({ length: images.length }, (_, key) => {
          return (
            <button
              className={selected === key ? "selected" : ""}
              onClick={() => setSelected(key)}
              key={key}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
