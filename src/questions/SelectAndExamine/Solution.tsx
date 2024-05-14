import { useEffect, useRef, useState } from "react";
import "./solution.css";
import api, { Job } from "./api";

const formatter = new Intl.DateTimeFormat("en-US");
const clsx = (ns: (string | boolean)[]) => ns.filter(Boolean).join(" ");

export default function SelectAndExamine() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [jobs, setJobs] = useState<Partial<Job>[]>([]);

  useEffect(() => {
    async function getJobs() {
      const jobs = await api.getJobs();
      setJobs(jobs);
    }
    getJobs();
  }, []);

  return (
    <div className="sae__container">
      <div className="sae__left-sidebar">
        {jobs.map((j) => {
          return (
            <button
              key={j.id}
              className={clsx([
                `sae__left-sidebar__job`,
                selectedId === j.id && "selected",
              ])}
              onClick={() => setSelectedId(j.id!)}
            >
              <div className="sae__left-sidebar__job__title">
                <h2>{j.title}</h2>
                <h3>{j.company}</h3>
              </div>

              <div className="sae__left-sidebar__job__description">
                <div>{formatter.format(new Date(j.posted!))}</div>
                <div>{j.status}</div>
              </div>
            </button>
          );
        })}
      </div>
      {selectedId === null ? (
        <div>Select a Job</div>
      ) : (
        <SelectAndExaminePanel id={selectedId} />
      )}
    </div>
  );
}

function SelectAndExaminePanel({ id }: { id: number }) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(false);
  // Ensure only the most recent data is displayed
  const counter = useRef(0);

  useEffect(() => {
    async function getJob() {
      counter.current += 1;
      const position = counter.current;

      setLoading(true);
      const job = await api.jobDescription(id);

      if (position >= counter.current) {
        setJob(job ?? null);
        setLoading(false);
      }
    }

    getJob();
  }, [id]);

  return (
    <div>
      {!job ? (
        <div>No job found</div>
      ) : loading ? (
        <>loading...</>
      ) : (
        <div className="sae__job-panel__container">
          <div>
            <h1>{job.title}</h1>
            <h3>{job.company}</h3>
          </div>

          <h2>Job Description</h2>
          <div>{job.description}</div>

          <h2>Job Requirements</h2>
          <ul>
            {job.requirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
