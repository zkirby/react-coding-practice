import { useCallback, useEffect, useRef, useState } from "react";
import "./solution.css";
import api from "./api";

const Window = ({ label, color }: { label: string; color: string }) => (
  <div className="iw__window" style={{ backgroundColor: color }}>
    {label}
  </div>
);

interface Cursors {
  next?: string;
  prev?: string;
}

interface Window {
  word: string;
  color: string;
}

interface WindowState {
  top: Window[];
  middle: Window[];
  bottom: Window[];
}

export default function InfiniteWindow() {
  const [windows, setWindows] = useState<WindowState>({
    top: [],
    middle: [],
    bottom: [],
  });

  const cursors = useRef<Cursors>({});

  const topSentinel = useRef<HTMLDivElement>(null);
  const bottomSentinel = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>(null);

  async function loadNext() {
    const { nextCursor, items } = await api.getWindows({
      cursor: cursors.current.next,
    });

    cursors.current = {
      ...cursors.current,
      next: nextCursor,
    };
    setWindows((w) => ({
      top: w.middle,
      middle: w.bottom,
      bottom: items,
    }));
  }

  async function loadPrev() {
    const { prevCursor, items } = await api.getWindows({
      cursor: cursors.current.prev,
    });

    cursors.current = {
      ...cursors.current,
      prev: prevCursor,
    };
    setWindows((w) => ({
      top: items,
      middle: w.top,
      bottom: w.middle,
    }));
  }

  // Observe Top
  useEffect(() => {
    if (!topSentinel.current || !observer.current) return;
    observer.current.observe(topSentinel.current);
    const sentinel = topSentinel.current;
    return () => observer.current?.unobserve(sentinel);
  }, [topSentinel.current]);

  // Observe Bottom
  useEffect(() => {
    if (!bottomSentinel.current || !observer.current) return;
    observer.current.observe(bottomSentinel.current);
    const sentinel = bottomSentinel.current;
    return () => observer.current?.unobserve(sentinel);
  }, [bottomSentinel.current]);

  useEffect(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver((e) => {
        if (e[0].isIntersecting) {
          if (e[0].target === topSentinel.current) {
            loadPrev();
          } else {
            loadNext();
          }
        }
      });
    }
  }, []);

  useEffect(() => {
    async function load2Pages() {
      const { nextCursor, items: middleWindows } = await api.getWindows();
      const { nextCursor: nextWindowsCursor, items: bottomWindows } =
        await api.getWindows({ cursor: nextCursor });

      cursors.current = {
        next: nextWindowsCursor,
      };
      setWindows({ top: [], middle: middleWindows, bottom: bottomWindows });
    }

    load2Pages();
  }, []);

  const { top, middle, bottom } = windows;
  console.log(top, middle, bottom);

  return (
    <div className="iw__container">
      {/* Top Sentinel Area */}
      {top.length ? (
        <div className="iw__area">
          {top.map((t) => (
            <Window label={t.word} color={t.color} />
          ))}
          <div className="iw__sentinel" ref={topSentinel}></div>
        </div>
      ) : null}

      {/* Viewable area */}
      <div className="iw__area">
        {middle.map((m) => (
          <Window label={m.word} color={m.color} />
        ))}
      </div>

      {/* Bottom Sentinel Area */}
      <div className="iw__area">
        <>
          {bottom.map((b) => (
            <Window label={b.word} color={b.color} />
          ))}
          <div className="iw__sentinel" ref={bottomSentinel}></div>
        </>
      </div>
    </div>
  );
}
