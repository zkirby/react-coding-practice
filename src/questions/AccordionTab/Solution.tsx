import { useState } from "react";

import "./solution.css";

interface AccordionTabProps {
  title: string;
  tabs: { id: string; title: string; content: React.ReactNode }[];
}

function AccordionTab({ title, tabs }: AccordionTabProps) {
  const [open, setOpen] = useState(false);
  const [tabId, setTabId] = useState(tabs[0].id);

  const tab = tabs.find((t) => t.id === tabId)!;

  return (
    <div>
      <button
        className="at__title__button"
        onClick={() => setOpen(!open)}
        aria-label="Open the accordion"
        data-open={open}
      >
        <div>&gt;</div>
        <div>{title}</div>
      </button>

      <div hidden={!open}>
        <div className="at__tabs__title-list">
          {tabs.map((t) => {
            return (
              <button
                onClick={() => setTabId(t.id)}
                key={t.id}
                data-active={t.id === tabId}
              >
                {t.title}
              </button>
            );
          })}
        </div>
        <div>{tab.content}</div>
      </div>
    </div>
  );
}

export default function UseAccordionTab() {
  const tabs = [
    {
      id: "1",
      title: "front-end",
      content: (
        <ul>
          <li>react</li>
          <li>js</li>
          <li>html</li>
        </ul>
      ),
    },
    {
      id: "2",
      title: "back-end",
      content: (
        <div>
          <div>work in progress..</div>
          <progress value={20} />
        </div>
      ),
    },
  ];
  return <AccordionTab tabs={tabs} title={"My Skills"} />;
}
