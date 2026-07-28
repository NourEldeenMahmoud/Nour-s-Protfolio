import type { LearnMediaItem } from "./types";

interface CertificateSource {
  file: string;
  title: string;
  provider: string;
}

const certificateSources: CertificateSource[] = [
  {
    file: "DEPI Nour Eldeen Mahmoud.pdf",
    title: "Full Stack .NET Web Developer",
    provider: "DEPI",
  },
  {
    file: "DEPI English Nour Eldeen Mahmoud .pdf",
    title: "Business English Track",
    provider: "DEPI",
  },
  {
    file: "Tailwind CSS From Scratch  Learn By Building Projects.pdf",
    title: "Tailwind CSS From Scratch",
    provider: "Udemy",
  },
  {
    file: "Complete C# Unity 3D Game Development in Unity 6.pdf",
    title: "Complete C# Unity 3D Game Development in Unity 6",
    provider: "Udemy",
  },
  {
    file: "Course_Certificate_ Database Fundamentals.pdf",
    title: "Database Fundamentals",
    provider: "ITI Mahara-Tech",
  },
  {
    file: "Course_Certificate_Ar.pdf",
    title: "Introduction to Databases",
    provider: "ITI Mahara-Tech",
  },
  {
    file: "Course_Certificate_ Transact SQL queries using SQL server.pdf",
    title: "Transact-SQL Queries Using SQL Server",
    provider: "ITI Mahara-Tech",
  },
  {
    file: "certificate-of-completion-for-1-programming-foundations-level-1.pdf",
    title: "Programming Foundations — Level 1",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-2-algorithms-problem-solving-level-1.pdf",
    title: "Algorithms & Problem Solving — Level 1",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-3-introduction-to-programming-using-c-level-1.pdf",
    title: "Introduction to Programming Using C++ — Level 1",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-4-algorithms-problem-solving-level-1-solutions.pdf",
    title: "Algorithms & Problem Solving — Level 1 Solutions",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-5-algorithms-problem-solving-level-2.pdf",
    title: "Algorithms & Problem Solving — Level 2",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-6-introduction-to-programming-using-c-level-2.pdf",
    title: "Introduction to Programming Using C++ — Level 2",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-7-algorithms-problem-solving-level-3.pdf",
    title: "Algorithms & Problem Solving — Level 3",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-08-algorithms-problem-solving-level-4.pdf",
    title: "Algorithms & Problem Solving — Level 4",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-09-foundations-level-2.pdf",
    title: "Programming Foundations — Level 2",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-10-oop-as-it-should-be-concepts.pdf",
    title: "OOP as It Should Be — Concepts",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-11-oop-as-it-should-be-applications.pdf",
    title: "OOP as It Should Be — Applications",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-12-data-structures-level1.pdf",
    title: "Data Structures — Level 1",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-13-algorithms-problem-solving-level-5.pdf",
    title: "Algorithms & Problem Solving — Level 5",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-14-c-level-1.pdf",
    title: "C# Programming — Level 1",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-15-database-level-1-sql-concepts-and-practice.pdf",
    title: "Database Level 1 — SQL Concepts and Practice",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-16-oop-as-it-should-be-in-c.pdf",
    title: "OOP as It Should Be in C#",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-17-database-sql-projects-practice.pdf",
    title: "Database & SQL Projects Practice",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-18-c-database-connectivity.pdf",
    title: "C# Database Connectivity",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-19-full-real-project.pdf",
    title: "Full Real Project",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-20-c-programming-level-2.pdf",
    title: "C# Programming — Level 2",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-21-database-level2-concepts-t-sql.pdf",
    title: "Database Level 2 — Concepts and T-SQL",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-22-data-structures-level-2-in-c.pdf",
    title: "Data Structures — Level 2 in C++",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-23-algorithms-level-6.pdf",
    title: "Algorithms & Problem Solving — Level 6",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-24-windows-services.pdf",
    title: "Windows Services",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-css-foundations-deep-dive.pdf",
    title: "CSS Foundations Deep Dive",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-entity-framework-core-fundamentals-ef-core.pdf",
    title: "Entity Framework Core Fundamentals",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-html-deep-dive.pdf",
    title: "HTML Deep Dive",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-introduction-to-restful-api.pdf",
    title: "Introduction to RESTful API",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-secure-your-apis-jwt-roles-policies-in-asp-net-core.pdf",
    title: "Secure Your APIs — JWT, Roles, and Policies in ASP.NET Core",
    provider: "ProgrammingAdvices",
  },
  {
    file: "certificate-of-completion-for-solid-principles.pdf",
    title: "SOLID Principles",
    provider: "ProgrammingAdvices",
  },
];

function toPreviewName(file: string): string {
  return `${file
    .replace(/\.pdf$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}.webp`;
}

export const certificateGallery: LearnMediaItem[] = certificateSources.map(
  ({ file, title, provider }) => ({
    src: `/learn/certificates/${toPreviewName(file)}`,
    alt: {
      en: `${title} certificate from ${provider}`,
      ar: `شهادة ${title} من ${provider}`,
    },
    caption: {
      en: `${title} · ${provider}`,
      ar: `${title} · ${provider}`,
    },
  }),
);
