const currentUserKey = "currentUser";

export function getCurrentStudent() {
  const user = JSON.parse(localStorage.getItem(currentUserKey) || "null");
  return user?.role === "student" ? user : null;
}

export function getSavedScholarships(userId) {
  return JSON.parse(localStorage.getItem(`savedScholarships_${userId}`) || "[]");
}

export function toggleSavedScholarship(scholarship) {
  const user = getCurrentStudent();
  if (!user) return { status: "login-required" };

  const key = `savedScholarships_${user.id}`;
  const saved = getSavedScholarships(user.id);
  const alreadySaved = saved.some((item) => item.id === scholarship.id);
  const next = alreadySaved
    ? saved.filter((item) => item.id !== scholarship.id)
    : [...saved, scholarship];

  localStorage.setItem(key, JSON.stringify(next));
  return { status: alreadySaved ? "removed" : "saved" };
}
