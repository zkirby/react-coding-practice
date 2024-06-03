import {
  useCallback,
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
  FormEvent,
} from "react";

import Websocket from "./WebSocket";

import "./solution.css";

export default function Chat() {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);

  const [loading, send] = useWebsocket({
    onMessage: useCallback(
      (s) =>
        setMessages((m) => {
          const curr = m.findIndex((os) => os.id === s.id);
          return curr === -1
            ? [...m, s]
            : // @ts-expect-error fix config
              m.with(curr, { id: s.id, text: m[curr].text + s.text });
        }),
      []
    ),
  });

  return (
    <div>
      {/* Messages */}
      <Loading loading={loading}>
        <div className="chat__message-container">
          {messages.map((m, i) => (
            <div
              className={cns(
                "chat__message-body",
                i % 2 === 0 ? "left" : "right"
              )}
              key={m.id}
            >
              {m.text}
            </div>
          ))}
        </div>
      </Loading>

      {/* Input */}
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const form = new FormData(e.currentTarget);
          send(form.get("send-message") as string);

          e.currentTarget.reset();
        }}
      >
        <input
          type="text"
          aria-label="input message to send"
          name="send-message"
          disabled={loading}
        />
      </form>
    </div>
  );
}

/** create classnames string */
const cns = (...args: string[]) => args.join(" ");

/** if loading: show spinner else: show children */
const Loading = ({
  children,
  loading,
}: PropsWithChildren<{ loading: boolean }>) => {
  return loading ? <div className="spinner" /> : children;
};

/** establish a websocket connection */
const useWebsocket = ({
  onMessage,
}: {
  onMessage: (s: { id: number; text: string }) => void;
}): [boolean, (m: string) => void] => {
  const ws = useRef<Websocket>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    ws.current = new Websocket();
  }, []);

  const onOpen = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (!ws.current) return;

    ws.current.addEventListener("open", onOpen);
    ws.current.addEventListener("message", onMessage);

    return () => {
      ws.current?.removeEventListener("open", onOpen);
      ws.current?.removeEventListener("message", onMessage);
    };
  }, [onOpen, onMessage]);

  const send = useCallback((m: string) => ws.current?.send(m), []);

  return [loading, send];
};
