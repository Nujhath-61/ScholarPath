import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Scholarships from "./pages/Scholarships";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import { Login, Register } from "./pages/Auth";
import Profile from "./pages/Profile";
import Resources from "./pages/Resources";
import AdminDashboard from "./pages/AdminDashboard";
import AdminScholarshipForm from "./pages/AdminScholarshipForm";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/scholarships/:id" element={<ScholarshipDetails />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resources" element={<Resources />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/new"
          element={
            <AdminRoute>
              <AdminScholarshipForm />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/edit/:index"
          element={
            <AdminRoute>
              <AdminScholarshipForm />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}