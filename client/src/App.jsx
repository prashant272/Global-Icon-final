import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Jury from "./pages/Jury";
import Guidelines from "./pages/Guidelines";
import Judging from "./pages/Judging";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import PreviousEditions from "./pages/PreviousEditions";
import Media from "./pages/Media.jsx";
import FAQ from "./pages/FAQ.jsx";
import EditionDetail from "./pages/EditionDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NominationForm from "./pages/NominationForm.jsx";
import NominationDetails from "./pages/NominationDetails.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#3a1418]">
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 bg-[#3a1418]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jury" element={<Jury />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/judging" element={<Judging />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          {/* Backward compatible + navbar links */}
          <Route path="/previous" element={<PreviousEditions />} />
          <Route path="/previous-editions" element={<PreviousEditions />} />
          <Route path="/media" element={<Media />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/editions/:year" element={<EditionDetail />} />
          <Route path="/nominate/:id?" element={<NominationForm />} />
          <Route
            path="/nomination/:id"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <NominationDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>



      {!location.pathname.startsWith("/admin") && <Footer />}
      <WhatsAppButton />
    </div >
  );
}
