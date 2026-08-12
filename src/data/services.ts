import { Globe, Smartphone, Monitor } from "@lucide/vue";
import type { Service } from "../types";

const services: Service[] = [
  {
    title: "Web App Development",
    description:
      "Full-stack web application development using modern frameworks like Vue.js, React, and Node.js with robust backend architectures and responsive user interfaces.",
    icon: Globe,
    tools: [
      "React",
      "Vue",
      "Node",
      "Next.js",
      "Nuxt",
      "NestJS",
      "Express",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "Cross-platform mobile application development for iOS and Android using React Native and Expo framework, delivering native performance with faster development and seamless deployment.",
    icon: Smartphone,
    tools: ["React Native", "Expo", "Android Studio"],
  },
  {
    title: "Desktop App Development",
    description:
      "Custom desktop application development for Windows platforms using C# and .NET framework, delivering high-performance solutions with intuitive user experiences.",
    icon: Monitor,
    tools: ["C#", "Windows Forms", ".NET"],
  },
];

export default services;
