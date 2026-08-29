import { scholarships as staticScholarships } from "../data/scholarships";

export const ADMIN_ID_OFFSET = 1000;

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop";

function mapAdminItem(item, index) {
  const type = item.type || "All levels";
  const hour = item.hour || "Not required";

  return {
    id: ADMIN_ID_OFFSET + index,
    name: item.title,
    university: item.institution || "Partner institution",
    available_program: type,
    location: item.location || "Not specified",
    funding: item.funding || "Varies",
    deadline: item.deadline || "See official site",
    description: item.description || "",
    image: item.image || DEFAULT_IMAGE,
    officialWebsite: item.link || "",
    eligibility: [
      `Study level: ${type}`,
      hour !== "Not required" ? `Experience: ${hour}` : null,
    ].filter(Boolean),
    benefits: ["See the official website for full benefit details."],
    documents: ["See the official website for required documents."],
    isAdminPosted: true,
  };
}

export function getAdminScholarships() {
  const items = JSON.parse(localStorage.getItem("list") || "[]");
  return items.map(mapAdminItem);
}

export function getAllScholarships() {
  return [...staticScholarships, ...getAdminScholarships()];
}

export function getScholarshipById(id) {
  const numId = Number(id);
  if (numId >= ADMIN_ID_OFFSET) {
    const items = JSON.parse(localStorage.getItem("list") || "[]");
    const index = numId - ADMIN_ID_OFFSET;
    return items[index] ? mapAdminItem(items[index], index) : null;
  }
  return staticScholarships.find((item) => item.id === numId) || null;
}
