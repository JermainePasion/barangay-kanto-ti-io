import { Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import ComplaintScreen from "./screens/complaints/ComplaintScreen";
import MyComplaintsScreen from "./screens/complaints/MyComplaintsScreen";
import FileComplaintScreen from "./screens/complaints/FileComplaintScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Assuming JWT stored in localStorage
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-[#FEF3E2] text-gray-800">
      <Routes>

        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route
          path="/complaint"
          element={
            <ProtectedRoute>
              <ComplaintScreen />
            </ProtectedRoute>
          }
        />
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
            <ProtectedRoute>
              <AdminDashboardScreen />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
