import type { NavSection } from "../types";
import { HOURS, projectHour } from "../scene/hours";

// The chapters of the page, each at its hour of the day at the house.
const sections: NavSection[] = [
  { key: "home", label: "Home", index: "01", hour: HOURS.hero },
  { key: "services", label: "Services", index: "02", hour: HOURS.services },
  { key: "skills", label: "Skills", index: "03", hour: HOURS.skills },
  { key: "portfolio", label: "Projects", index: "04", hour: projectHour(0) },
  { key: "contact", label: "Contact", index: "05", hour: HOURS.contact },
];

export default sections;
