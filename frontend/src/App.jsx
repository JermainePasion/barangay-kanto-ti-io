import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ComplaintScreen from "./screens/complaints/ComplaintScreen";
import MyComplaintsScreen from "./screens/complaints/MyComplaintsScreen";
import FileComplaintScreen from "./screens/complaints/FileComplaintScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import ComplaintsList from "./screens/complaints/ComplaintsList";
import AboutUs from "./screens/AboutUs";


// Protect route for logged-in users
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" replace />;
};

// Protect route for admins only
const AdminRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  return user?.role === "admin" ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-[#FEF3E2] text-gray-800">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/complaints/:id" element={<ComplaintScreen />} />
        <Route path="/complaints" element={<ComplaintsList />} />
        <Route path="/about" element={<AboutUs />} />

        <Route
          path="/filecomplaint"
          element={
            <ProtectedRoute>
              <FileComplaintScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mycomplaints"
          element={
            <ProtectedRoute>
              <MyComplaintsScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboardScreen />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
