export interface Project {
  icon: string;
  label: string;
  desc: string;
}

export const allProjects = [
  { icon: "🍅", label: "Tomato", desc: "detail of project" },
  { icon: "🥬", label: "Lettuce", desc: "detail of project" },
  { icon: "🧀", label: "Cheese", desc: "detail of project" },
  { icon: "🥕", label: "Carrot", desc: "detail of project" },
  { icon: "🍌", label: "Banana", desc: "detail of project" },
  { icon: "🫐", label: "Blueberries", desc: "detail of project" },
  { icon: "🥂", label: "Champers?", desc: "detail of project" },
];

const [tomato, lettuce, cheese] = allProjects;
export const initialTabs = [tomato, lettuce, cheese];

export function getNextIngredient(projects: Project[]): Project | undefined {
  const existing = new Set(projects);
  return allProjects.find((project) => !existing.has(project));
}
