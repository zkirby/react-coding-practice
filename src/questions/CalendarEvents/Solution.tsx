import { useRef, useState } from "react";
import "./solution.css";

const clsx = (...args: (string | boolean)[]) => args.filter(Boolean).join(" ");

interface CalendarEvent {
  id: number;
  start: string;
  end: string;
  name: string;
}

const DEFAULT_FORM_STATE = {
  start: "",
  end: "",
  name: "",
};

export default function CalendarEvents() {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const id = useRef(0);

  const updateFormValue = (value: string, key: string) =>
    setFormData((f) => ({ ...f, [key]: value }));

  const addOrEditEvent = () => {
    if (selectedEventId) {
      setEvents((evts) => {
        return [
          ...evts.filter((e) => e.id !== selectedEventId),
          { id: selectedEventId, ...formData },
        ];
      });
      setSelectedEventId(null);
    } else {
      id.current += 1;
      setEvents((e) => [
        ...e,
        {
          id: id.current,
          name: formData.name,
          start: formData.start,
          end: formData.end,
        },
      ]);
    }

    setFormData(DEFAULT_FORM_STATE);
  };

  const editEvent = (event: CalendarEvent) => {
    setSelectedEventId(event.id);
    setFormData(event);
  };

  return (
    <div className="ce__wrapper">
      <div className="ce__calendar-body">
        {Array.from({ length: 30 }, (_, key) => {
          return (
            <div className="ce__calendar-body__cell" key={key}>
              {key}
              {events.map((e) => {
                const start = parseInt(e.start);
                const end = parseInt(e.end);
                if (start <= key && end >= key) {
                  return (
                    <div
                      onClick={() => {
                        editEvent(e);
                      }}
                      className={clsx(
                        "ce__calendar-body__cell-event__all-day",
                        start === key && "left-end",
                        end === key && "right-end"
                      )}
                    >
                      {start === key && e.name}
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>

      <form
        className="ce__calendar-form"
        onSubmit={(e) => {
          e.preventDefault();
          addOrEditEvent();
        }}
      >
        <label>
          Name
          <input
            type="text"
            value={formData?.name}
            onChange={(e) => updateFormValue(e.target.value, "name")}
          />
        </label>

        <label>
          Start day
          <input
            type="number"
            value={formData.start}
            onChange={(e) => updateFormValue(e.target.value, "start")}
          />
        </label>

        <label>
          End day
          <input
            type="number"
            value={formData.end}
            onChange={(e) => updateFormValue(e.target.value, "end")}
          />
        </label>

        <button>Add Event</button>
      </form>
    </div>
  );
}
