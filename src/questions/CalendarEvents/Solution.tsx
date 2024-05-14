import { useRef, useState } from "react";
import "./solution.css";

const clsx = (...args: (string | boolean)[]) => args.filter(Boolean).join(" ");

interface CalendarEvent {
  id: number;
  start: number;
  end: number;
  name: string;
}

const DEFAULT_FORM_STATE = {
  start: "",
  end: "",
  name: "",
};

export default function CalendarEvents() {
  const [formData, setFormData] = useState(DEFAULT_FORM_STATE);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const id = useRef(0);

  const updateFormValue = (value, key) =>
    setFormData((f) => ({ ...f, [key]: value }));

  const addOrEditEvent = () => {
    console.log(formData);
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
          start: parseInt(formData.start),
          end: parseInt(formData.end),
        },
      ]);
    }

    setFormData(DEFAULT_FORM_STATE);
  };

  const editEvent = (event) => {
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
                if (e.start <= key && e.end >= key) {
                  return (
                    <div
                      onClick={() => {
                        editEvent(e);
                      }}
                      className={clsx(
                        "ce__calendar-body__cell-event__all-day",
                        e.start === key && "left-end",
                        e.end === key && "right-end"
                      )}
                    >
                      {e.start === key && e.name}
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
