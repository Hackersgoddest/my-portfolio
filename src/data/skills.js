import { LocationOutline, CloudDownloadOutline } from "@vicons/ionicons5";

const skillsData = {
  // Frontend Development
  frontend: [
    {
      name: "HTML5",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331606/html-5-svgrepo-com_wpwmcr.svg",
      category: "markup"
    },
    {
      name: "CSS3",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331606/css-3-svgrepo-com_k6it1a.svg",
      category: "styling"
    },
    {
      name: "JavaScript",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331608/javascript-svgrepo-com_dljq6m.svg",
      category: "language"
    },
    {
      name: "TypeScript",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761332233/typescript-svgrepo-com_cna3ef.svg",
      category: "language"
    },
    {
      name: "React.js",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748681711/reactjs-svgrepo-com_ay2juw.svg",
      category: "framework"
    },
    {
      name: "Vue.js",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748684957/vue-svgrepo-com_u7evpd.svg",
      category: "framework"
    },
    {
      name: "Next.js",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748684943/next-js-svgrepo-com_ax98mg.svg",
      category: "framework"
    },
    {
      name: "Nuxt.js",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748684916/nuxt-svgrepo-com_yc2var.svg",
      category: "framework"
    },
    {
      name: "Tailwind CSS",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748685190/tailwindcss-icon-svgrepo-com_fewqn7.svg",
      category: "styling"
    },
    {
      name: "Naive UI",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761333689/letter-n-svgrepo-com_xpphrf.svg",
      category: "ui-library"
    },
  ],

  // Backend Development
  backend: [
    {
      name: "Node.js",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748685426/nodejs-1-logo-svgrepo-com_q4uvtf.svg",
      category: "runtime"
    },
    {
      name: "Express.js",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748684756/express-svgrepo-com_d26izs.svg",
      category: "framework"
    },
    {
      name: "Fastify",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331604/fastify-icon-svgrepo-com_pf4pwi.svg",
      category: "framework"
    },
    {
      name: "Nest.js",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748684943/next-js-svgrepo-com_ax98mg.svg",
      category: "framework"
    },
    {
      name: "FeathersJS",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331606/feathersjs-svgrepo-com_i4cpl4.svg",
      category: "framework"
    },
    {
      name: "Python",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331608/python-svgrepo-com_d7haen.svg",
      category: "programming"
    },
    {
      name: "Django",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331606/django-svgrepo-com_orxppq.svg",
      category: "framework"
    },
    {
      name: "Java",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331608/java-svgrepo-com_hm1hzv.svg",
      category: "programming"
    },
    {
      name: "C#",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748684736/csharp-svgrepo-com_itij5a.svg",
      category: "programming"
    },
    {
      name: ".NET",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748684746/dot-net-svgrepo-com_oejp6g.svg",
      category: "framework"
    },
  ],

  // Mobile Development
  mobile: [
    {
      name: "React Native",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748681711/reactjs-svgrepo-com_ay2juw.svg",
      category: "framework"
    },
    {
      name: "Flutter",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331604/flutter-svgrepo-com_ausm2g.svg",
      category: "framework"
    },
    {
      name: "Expo",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748681424/expo-svgrepo-com_jq6ehe.svg",
      category: "platform"
    },
  ],

  // Database & Storage
  database: [
    {
      name: "MongoDB",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748684803/mongodb-svgrepo-com_b3xsei.svg",
      category: "nosql"
    },
    {
      name: "MySQL",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748684975/mysql-svgrepo-com_z3pmtr.svg",
      category: "sql"
    },
    {
      name: "PostgreSQL",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1748684933/postgresql-logo-svgrepo-com_zg0lca.svg",
      category: "sql"
    },
    {
      name: "Redis",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331608/redis-svgrepo-com_luittg.svg",
      category: "cache"
    },
  ],

  // Cloud & DevOps
  cloud: [
    {
      name: "AWS",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331604/aws-svgrepo-com_tzg2ib.svg",
      category: "cloud-provider"
    },
    {
      name: "Digital Ocean",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331966/digital-ocean-svgrepo-com-2_yohfik.svg",
      category: "cloud-provider"
    },
    {
      name: "Docker",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331607/docker-svgrepo-com_yrxxoo.svg",
      category: "containerization"
    },
  ],

  // Tools & Version Control
  tools: [
    {
      name: "Git",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331604/git-svgrepo-com_tpazde.svg",
      category: "version-control"
    },
    {
      name: "GitHub",
      src: "https://res.cloudinary.com/dfm07q3n0/image/upload/v1761331605/github-142-svgrepo-com_fan7te.svg",
      category: "platform"
    },
  ],

  // Personal Info (for Home section)
  personal: [
    {
      name: "Location",
      icon: LocationOutline,
      category: "info"
    },
    {
      name: "Resume",
      icon: CloudDownloadOutline,
      category: "info"
    },
  ],

  // Legacy properties for backward compatibility
  get frontEnd() {
    return this.frontend;
  },
  
  get backEnd() {
    return this.backend;
  },
  
  get Home() {
    return this.personal;
  }
};

export default skillsData;