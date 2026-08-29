import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/appPages.css";
import RoleToggle from "../components/RoleToggle";

function Field({ label, name, type = "text", ...props }) {
  return (
    <label>
      {label}
      <input name={name} type={type} required {...props} />
    </label>
  );
}

export function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("student");

  function submit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email").trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem("scholarPathUsers") || "[]");
    const user = users.find(
      (item) => item.email === email && item.password === data.get("password")
    );
    if (!user) return setMessage("Incorrect email or password.");
    if (user.role !== role) {
      return setMessage(`This account is registered as ${user.role}, not ${role}.`);
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate(user.role === "admin" ? "/admin" : "/profile");
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Log in to your account.</h1>
        <p>Continue exploring scholarships made for your goals.</p>
        <RoleToggle value={role} onChange={setRole} />
        <form onSubmit={submit}>
          <Field label="Email address" name="email" type="email" placeholder="example@email.com" />
          <Field
            label="Password"
            name="password"
            type={show ? "text" : "password"}
            placeholder="Enter your password"
          />
          <label className="check-row">
            <input type="checkbox" onChange={(e) => setShow(e.target.checked)} /> Show password
          </label>
          {message && <p className="form-message error">{message}</p>}
          <button className="primary-button">Log in</button>
        </form>
        <p className="auth-switch">
          New to ScholarPath? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
}const ADMIN_CODE = "admin"; // change this to whatever you want

export function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [role, setRole] = useState("student");

  function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    if (data.password !== data.confirmPassword) {
      return setMessage("Passwords do not match.");
    }
    if (role === "admin" && data.adminCode !== ADMIN_CODE) {
      return setMessage("Invalid admin access code.");
    }

    const users = JSON.parse(localStorage.getItem("scholarPathUsers") || "[]");
    const email = data.email.trim().toLowerCase();
    if (users.some((u) => u.email === email)) {
      return setMessage("An account with this email already exists.");
    }

    const baseUser = {
      id: Date.now(),
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      email,
      institution: data.institution.trim(),
      address: data.address.trim(),
      password: data.password,
      role,
    };

    const user =
      role === "admin"
        ? { ...baseUser, designation: data.designation.trim() }
        : { ...baseUser, aspirant: data.aspirant };

    localStorage.setItem("scholarPathUsers", JSON.stringify([...users, user]));
    localStorage.setItem("currentUser", JSON.stringify(user));
   navigate(role === "admin" ? "/admin" : "/scholarships", { state: { justRegistered: true } });
  }

  return (
    <main className="auth-page">
      <section className="auth-card wide">
        <p className="eyebrow">CREATE YOUR ACCOUNT</p>
        <h1>{role === "admin" ? "Create an admin account." : "Start your scholarship journey."}</h1>
        <p>
          {role === "admin"
            ? "Post and manage scholarships for your institution."
            : "Sign up to discover opportunities made for you."}
        </p>
        <RoleToggle value={role} onChange={setRole} />
        <form onSubmit={submit} key={role}>
          <div className="two-columns">
            <Field label="Full name" name="fullName" />
            <Field label="Phone number" name="phone" />
          </div>
          <Field label="Email address" name="email" type="email" />

          {role === "admin" ? (
            <>
              <div className="two-columns">
                <Field label="Institution" name="institution" />
                <Field label="Designation" name="designation" placeholder="e.g. Admission Officer" />
              </div>
              <Field label="Admin access code" name="adminCode" placeholder="Provided by ScholarPath" />
            </>
          ) : (
            <div className="two-columns">
              <Field label="Institution" name="institution" />
              <label>
                Study level
                <select required name="aspirant">
                  <option value="">Select your level</option>
                  <option>Undergraduate</option>
                  <option>Master&apos;s</option>
                  <option>PhD</option>
                </select>
              </label>
            </div>
          )}

          <Field label="Address" name="address" />
          <div className="two-columns">
            <Field label="Password" name="password" type="password" minLength="6" />
            <Field label="Confirm password" name="confirmPassword" type="password" />
          </div>
          <label className="check-row">
            <input required type="checkbox" /> I agree to the Terms and Conditions.
          </label>
          {message && <p className="form-message error">{message}</p>}
          <button className="primary-button">
            {role === "admin" ? "Create admin account" : "Create account"}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </section>
    </main>
  );
}