import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { Toaster } from "react-hot-toast";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
};

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return children;
};

function App() {
  const token = localStorage.getItem("adminToken");

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/*"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="*"
          element={
            <Navigate
              to={token ? "/dashboard/home" : "/auth/sign-in"}
              replace
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
