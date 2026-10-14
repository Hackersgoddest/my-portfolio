/** "Quality Assurance Management System" -> "quality-assurance-management-system" */
export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** The id (and URL hash) of a project's row: #project-schoolshield */
export const projectId = (title: string) => `project-${slugify(title)}`;
