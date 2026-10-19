// Experience, leadership and certifications, taken from the CV.

export type Role = {
  title: string;
  org: string;
  period: string;
  points: string[];
  link?: { label: string; href: string };
};

export const roles: Role[] = [
  {
    title: 'Software Engineering Intern',
    org: 'Beaver Creation (Pvt) Ltd',
    period: 'Sep 2025 - Apr 2026',
    points: [
      'Worked across the delivery cycle: feature implementation, debugging, testing and deployment support.',
      'Took part in requirement gathering and turned business needs into concrete technical tasks.',
      'Built the company website in Next.js, TypeScript and Tailwind CSS, now live at beavercreation.com.',
      'Coordinated sprint tasks, progress updates and stakeholder follow-ups with developers, designers and QA.',
    ],
    link: { label: 'beavercreation.com', href: 'https://www.beavercreation.com/' },
  },
  {
    title: 'Volunteer',
    org: 'ICC T20 World Cup 2026, Sri Lanka',
    period: '2026',
    points: [
      'Supported event coordination and operational workflows for an international tournament in a fast-paced team.',
    ],
  },
  {
    title: 'Project Intern, Project Management',
    org: 'International Youth Alliance for Peace',
    period: '2021',
    points: ['Supported project coordination and digital documentation, and contributed to team reporting.'],
  },
];

export const leadership: { title: string; org: string; period: string }[] = [
  { title: 'Vice President', org: "IT Students' Association, University of Kelaniya", period: '2022 - 2023' },
  { title: 'Committee Member', org: "IT Students' Association, University of Kelaniya", period: '2021 - 2022' },
  { title: 'Batch Representative, 3rd Year', org: 'University of Kelaniya', period: '2024 - 2025' },
  { title: 'University Colours Awardee', org: 'University of Kelaniya', period: '2024' },
  { title: 'Taekwondo Team Member', org: 'University of Kelaniya', period: '2023 - 2026' },
  { title: 'Senior Prefect', org: 'Central College, Anuradhapura', period: '2016 - 2018' },
  { title: 'Silver Medallist', org: 'All Island Open Karate Tournament', period: '2011' },
];

export const certifications: { name: string; issuer: string }[] = [
  { name: 'iTwin Developer: Associate', issuer: 'Bentley Systems' },
  { name: 'AWS Cloud Essentials for Business Leaders', issuer: 'Amazon Web Services' },
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp' },
  { name: 'Diploma in ICT', issuer: 'Esoft Metro Campus' },
  { name: 'Diploma in English', issuer: 'Esoft Metro Campus' },
];
