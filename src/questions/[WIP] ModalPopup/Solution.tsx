import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Playground() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Modal open={isOpen} onExit={() => setIsOpen(false)}>
        <h1>Hello!</h1>
        <p>this is some modal content!</p>
      </Modal>

      <button type="button" onClick={() => setIsOpen(true)}>
        Open
      </button>
    </div>
  );
}

interface ModalProps {
  onExit: () => void;
  open: boolean;
}

/** Generic Modal component */
function Modal({
  onExit,
  open,
  children,
}: React.PropsWithChildren<ModalProps>) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(modalRef, onExit);

  return createPortal(
    <div hidden={!open} ref={modalRef}>
      {children}

      <button onClick={onExit}>Close</button>
    </div>,
    document.body
  );
}

/** Calls a fn when a click happens outside of the element ref */
function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onClick: () => void
) {
  const handleClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      onClick();
    },
    [onClick, ref]
  );

  useEffect(() => {
    document.body.addEventListener("mousedown", handleClick);
    document.body.addEventListener("touchstart", handleClick);
    return () => {
      document.body.removeEventListener("mousedown", handleClick);
      document.body.removeEventListener("touchstart", handleClick);
    };
  }, [handleClick]);
}
