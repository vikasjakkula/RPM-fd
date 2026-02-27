import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Predict from "./pages/Predict";
import Histogram from "./pages/Histogram";

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* First outlet: Layout (Navbar + main content Outlet) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Home />} />
        {/* Second outlet: DashboardLayout wraps dashboard and future sub-routes */}
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          {/* Add more dashboard sub-routes here; they render in DashboardLayout's Outlet */}
        </Route>
        <Route path="predict" element={<Predict />} />
        <Route path="histogram" element={<Histogram />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
