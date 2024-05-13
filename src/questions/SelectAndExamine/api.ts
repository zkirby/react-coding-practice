// Simulate an API call delay
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface Job {
  id: number;
  title: string;
  company: string;
  status: string;
  description: string;
  requirements: string[];
  posted: string; // isoTimeStamp
}

const JOBS: Job[] = [
  {
    title: "Software Engineer",
    company: "ABC Inc.",
    status: "Full Time",
    description:
      "Join our team of talented engineers to build cutting-edge software solutions. You will be involved in all stages of the development lifecycle, from concept to deployment. Collaborate with cross-functional teams to define, design, and ship new features.",
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience in software development",
      "Proficiency in JavaScript and Node.js",
    ],
    posted: "2024-05-13T12:00:00Z",
  },
  {
    title: "Graphic Designer",
    company: "XYZ Studios",
    status: "Part Time",
    description:
      "Create visually stunning graphics for web and print materials. Work closely with the creative team to develop concepts, graphics, and layouts. Ensure brand consistency across all projects.",
    requirements: [
      "Proficiency in Adobe Creative Suite",
      "Experience with branding, logo design, and typography",
      "Strong portfolio showcasing design skills",
    ],
    posted: "2024-05-12T09:30:00Z",
  },
  {
    title: "Marketing Intern",
    company: "123 Marketing Agency",
    status: "Part Time",
    description:
      "Assist in developing marketing strategies and campaigns. Conduct market research and analyze trends to identify new marketing opportunities. Support the marketing team in daily administrative tasks.",
    requirements: [
      "Currently enrolled in a Marketing or related program",
      "Strong communication and organizational skills",
      "Ability to work well in a team environment",
    ],
    posted: "2024-05-11T15:20:00Z",
  },
  {
    title: "Customer Support Specialist",
    company: "CustomerFirst Inc.",
    status: "Full Time",
    description:
      "Provide exceptional customer service and resolve inquiries via phone and email. Identify and escalate priority issues. Maintain customer records by updating account information.",
    requirements: [
      "Excellent communication and problem-solving skills",
      "Experience in a customer-facing role",
      "Ability to multitask and prioritize",
    ],
    posted: "2024-05-10T10:45:00Z",
  },
  {
    title: "Product Manager",
    company: "InnovateTech",
    status: "Full Time",
    description:
      "Lead product development and drive innovation. Define product vision, strategy, and roadmap. Collaborate with engineering, design, and marketing teams to deliver successful products.",
    requirements: [
      "5+ years of product management experience",
      "Strong analytical and problem-solving skills",
      "Ability to influence and collaborate across teams",
    ],
    posted: "2024-05-09T14:15:00Z",
  },
  {
    title: "Sales Representative",
    company: "BestDeals Corp.",
    status: "Full Time",
    description:
      "Develop new business and maintain relationships with existing clients. Conduct market research to identify selling possibilities and evaluate customer needs. Achieve sales targets and outcomes within schedule.",
    requirements: [
      "Proven sales experience",
      "Ability to build productive business relationships",
      "Excellent selling, negotiation, and communication skills",
    ],
    posted: "2024-05-08T11:10:00Z",
  },
  {
    title: "Accountant",
    company: "FinanceWorks Ltd.",
    status: "Full Time",
    description:
      "Manage financial records and prepare reports. Ensure compliance with financial regulations and standards. Analyze financial information to guide business decisions.",
    requirements: [
      "Bachelor's degree in Accounting or Finance",
      "CPA certification preferred",
      "Experience with accounting software",
    ],
    posted: "2024-05-07T16:30:00Z",
  },
  {
    title: "HR Coordinator",
    company: "HRPro Solutions",
    status: "Full Time",
    description:
      "Assist with recruitment, onboarding, and employee relations. Coordinate HR projects and initiatives. Maintain employee records and HR documents.",
    requirements: [
      "Degree in Human Resources or related field",
      "Knowledge of HR best practices",
      "Strong attention to detail",
    ],
    posted: "2024-05-06T13:20:00Z",
  },
  {
    title: "Web Developer",
    company: "WebTech Solutions",
    status: "Full Time",
    description:
      "Design and develop responsive web applications. Collaborate with back-end developers and web designers to improve usability. Stay current on emerging technologies and best practices.",
    requirements: [
      "Proficiency in HTML, CSS, and JavaScript",
      "Experience with front-end frameworks like React",
      "Knowledge of SEO principles",
    ],
    posted: "2024-05-05T09:00:00Z",
  },
  {
    title: "Data Analyst",
    company: "DataInsights",
    status: "Full Time",
    description:
      "Analyze data to provide insights and support decision-making. Develop and implement databases, data collection systems, data analytics, and other strategies. Interpret data, analyze results, and provide ongoing reports.",
    requirements: [
      "Strong analytical skills",
      "Proficiency in SQL and data visualization tools",
      "Experience in data mining and statistical analysis",
    ],
    posted: "2024-05-04T14:45:00Z",
  },
].map((j, idx) => ({ ...j, id: idx }));

export default {
  async getJobs(): Promise<Partial<Job>[]> {
    await sleep(300);
    return JOBS.map((j) => ({
      id: j.id,
      title: j.title,
      company: j.company,
      status: j.status,
      posted: j.posted,
    }));
  },
  async jobDescription(id: number): Promise<Job | undefined> {
    console.log(id);
    await sleep(2000);
    return JOBS.find((j) => j.id === id);
  },
};
