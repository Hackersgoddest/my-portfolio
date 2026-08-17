import type { Project } from "../types";

// TODO: swap for a real screenshot once one's available (same Cloudinary
// pattern as the other projects) - this is a placeholder card only.
const QA_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='900'%3E%3Crect width='1200' height='900' fill='%230a0a0f'/%3E%3Ctext x='50%25' y='47%25' text-anchor='middle' font-family='monospace' font-size='48' font-weight='bold' fill='%2310b981'%3EQuality Assurance%3C/text%3E%3Ctext x='50%25' y='55%25' text-anchor='middle' font-family='monospace' font-size='22' fill='%238b8ba7'%3EManagement System%3C/text%3E%3C/svg%3E";

const projects: Project[] = [
  {
    title: "SchoolShield",
    category: "Personal Project",
    description: `<p>Focus-first, theft-resistant device management: SchoolShield gives schools, parents, and businesses one dashboard to manage devices — content filtering, app control, remote lock, and theft protection.</p><ul><li>Kiosk-lock classroom tablets to approved apps and manage every device's policy from one dashboard (Schools)</li><li>Filter what a child's phone can reach, with Factory Reset Protection so a reset alone can't hand it to someone else (Families)</li><li>Lock company-issued phones and tablets to work-approved apps, with remote lock, wipe, and anti-theft protection (Businesses)</li></ul>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1786946637/WhatsApp_Image_2026-08-17_at_05.56.55_cemgeh.jpg",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1786560777/Screenshot_2026-08-12_at_6.51.59_PM_gczdlh.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1786560776/Screenshot_2026-08-12_at_6.51.06_PM_utzeig.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1786560775/Screenshot_2026-08-12_at_6.50.44_PM_bdhqf9.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1786560776/Screenshot_2026-08-12_at_6.51.20_PM_w7ex9g.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1786560777/Screenshot_2026-08-12_at_6.51.39_PM_z29do8.png"
    ],
    tools: [
      "Next.js",
      "React",
      "TypeScript",
      "Go",
      "PostgreSQL",
      "Expo",
      "Kotlin",
      "Tailwind CSS",
    ],
    links: [{ name: "VISIT SITE", type: "site", link: "https://schoolshield.app" }],
  },
  {
    title: "Memora",
    category: "Personal Project",
    description: `<p>Memora is a contribution and event management platform trusted by communities across Ghana — used for funerals, memorials, church events, and community fundraising, with real-time Mobile Money tracking and instant verified receipts.</p><ul><li>Guests contribute via Mobile Money by scanning a QR code or event link — no app download required</li><li>Every contribution generates an automated, verifiable receipt with an instant SMS confirmation</li><li>Organizers track totals in real time and export audit-ready PDF reports</li></ul>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1774948354/Screenshot_2026-03-31_at_9.11.47_AM_lu05oh.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1774948354/Screenshot_2026-03-31_at_9.11.21_AM_eoewkh.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1774948443/dashboard-light_kf2tzk.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1774948443/dashboard-dark_obxqrc.png",
    ],
    tools: [
      "TypeScript",
      "Next.js",
      "React",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "Tailwind CSS",
    ],
    links: [{ name: "VISIT SITE", type: "site", link: "https://memora.joetech247.com" }],
  },
  {
    title: "Eban Register",
    category: "Team Project",
    description: `<p>Eban Register has grown from an attendance tracker into a full HR management platform — payroll automation, leave management, employee self-service, and multi-branch reporting for teams from 10 to 10,000 employees.</p><ul><li>Automated payroll processing with statutory deductions and compliance checks</li><li>A companion mobile app (iOS &amp; Android) gives employees self-service access to leave requests, payslips, and profile updates</li><li>Centralized dashboards for attendance, payroll summaries, and workforce insights across departments and locations</li></ul><blockquote>With hundreds of employees across our manufacturing facilities, we needed a robust HR system that could scale. Eban delivered exactly that, with seamless payroll processing and real-time workforce visibility.<cite>Ama Sarpong, Head of Human Resources, GB Foods</cite></blockquote>`,
    images: [
      "https://res.cloudinary.com/jolsoft/image/upload/v1634246757/portfolio/eban-admin/eban-admin-screen-1_zmjbnx.png",
      "https://res.cloudinary.com/jolsoft/image/upload/v1634247513/portfolio/eban-admin/eban-admin-screen-2_pcvgyu.png",
      "https://res.cloudinary.com/jolsoft/image/upload/v1634248046/portfolio/eban-admin/eban-admin-screen-3_licoyr.png",
    ],
    tools: [
      "Astro",
      "VueJs",
      "Bootstrap",
      "TypeScript",
      "NestJS",
      "Expo",
      "PostgreSQL",
    ],
    links: [
      { name: "VISIT SITE", type: "site", link: "https://www.ebanregister.com/" },
      { name: "APP STORE", type: "ios", link: "https://apps.apple.com/us/app/eban-register/id1533556318" },
      { name: "GOOGLE PLAY", type: "android", link: "https://play.google.com/store/apps/details?id=com.eban.ebanapp" },
    ],
  },
  {
    title: "Quality Assurance Management System",
    category: "School Project",
    description: `<p>A full-stack quality assurance platform built for educational institutions, covering accreditation, assessment, and auditing workflows with role-based access control across web and native mobile clients.</p><ul><li>Multi-module system for accreditation, assessment, and auditing, with role-based access control and a real-time analytics dashboard with automated, exportable reports</li><li>A companion mobile app (React Native, Expo Router) handles dynamic, Zod-validated questionnaires for complex forms, offline data sync, and Cloudinary media uploads</li><li>Secure authentication and storage across both clients, with push notifications keeping reviewers and institutions in sync</li></ul>`,
    images: [QA_PLACEHOLDER],
    tools: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "React Native",
      "Expo Router",
      "Zod",
      "React Hook Form",
      "Cloudinary",
    ],
    links: [
      {
        name: "VIEW CODE",
        type: "code",
        link: "https://github.com/Hackersgoddest/quality-assurance",
      },
    ],
  },
  {
    title: "GreenGold Ghana",
    category: "Freelance Project",
    description: `<p>GreenGold Ghana is an eco-innovation company that transforms discarded plantain waste into high-quality, eco-friendly fibers. Rebuilt with Vite and Tailwind CSS v4, improving load performance by 40%. The platform showcases their sustainable manufacturing process and allows users to:</br><ul><li>Explore eco-friendly products (wigs, hair extensions, sanitary pads, bags)</li><li>Learn about environmental impact and sustainability</li><li>Connect with the team and investors</li><li>Partner with the company for sustainable solutions</li><li>View real-time impact statistics (CO₂ saved, jobs created)</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761389446/Screenshot_2025-10-25_at_10.48.37_AM_jpiop6.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761389447/Screenshot_2025-10-25_at_10.49.00_AM_hdv5oi.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761389447/Screenshot_2025-10-25_at_10.49.18_AM_rsbvwx.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761389446/Screenshot_2025-10-25_at_10.49.30_AM_rs1psj.png",
    ],
    tools: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS v4",
      "Framer Motion",
      "React Router",
      "Lucide Icons",
    ],
    links: [
      { name: "VISIT SITE", type: "site", link: "https://greengoldghanalimited.netlify.app" },
      {
        name: "VIEW CODE",
        type: "code",
        link: "https://github.com/Hackersgoddest/greengold",
      },
    ],
  },
  {
    title: "Promptopia",
    category: "Personal Project",
    description: `<p>Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts. The application allows one to:</br><ul><li>Discover AI prompts</li><li>Create AI prompts</li><li>Edit AI prompts</li><li>Delete AI prompts</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491174/login_d2wlty.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491191/homepage_abswnc.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1734491206/profile_glj8lb.png",
    ],
    tools: [
      "NextJs",
      "Tailwind",
      "DaisyUI",
      "Typescript",
      "MongoDB",
      "NextAuth",
    ],
    links: [
      {
        name: "VIEW CODE",
        type: "code",
        link: "https://github.com/Hackersgoddest/promptopia",
      },
    ],
  },
  {
    title: "E-VotePro",
    category: "School Project",
    description: `<p>A comprehensive voting system built using C# Windows Forms and MySQL, designed to facilitate secure, efficient, and transparent elections. Perfect for educational institutions, organizations, and small-scale elections. The system features:</br><ul><li>Secure user authentication for students and admins</li><li>Real-time voting results and analytics</li><li>Comprehensive admin dashboard for election management</li><li>Candidate management system</li></ul></p>`,
    images: [
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968512/Screenshot_2025-06-03_at_4.30.45_PM_iygotw.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968505/Screenshot_2025-06-03_at_4.30.30_PM_bqnl7e.png",
      "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748968497/Screenshot_2025-06-03_at_4.30.18_PM_xma9og.png",
    ],
    tools: ["C#", "Windows Forms", ".NET", "MySQL", "Entity Framework"],
    links: [
      {
        name: "VIEW CODE",
        type: "code",
        link: "https://github.com/Hackersgoddest/E-VotePro",
      },
    ],
  },
];

export default projects;
