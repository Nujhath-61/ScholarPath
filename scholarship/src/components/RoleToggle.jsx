export default function RoleToggle({ value, onChange }) {
  return (
    <div className="role-toggle" role="radiogroup" aria-label="Account type">
      <button
        type="button"
        className={value === "student" ? "active" : ""}
        onClick={() => onChange("student")}
        aria-pressed={value === "student"}
      >
        Student
      </button>
      <button
        type="button"
        className={value === "admin" ? "active" : ""}
        onClick={() => onChange("admin")}
        aria-pressed={value === "admin"}
      >
        Admin
      </button>
    </div>
  );
}