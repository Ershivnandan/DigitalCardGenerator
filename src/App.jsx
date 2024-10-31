import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/login/Login";
import Dashbord from "./pages/dashbord/Dashbord";
import Cardtemplate from "./components/Cardtemplate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CardPreview from "./components/CardPreview";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/cardPreview/:id" element={<CardPreview />} />
        {/* Private Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashbord />
            </PrivateRoute>
          }
        />
        <Route
          path="/cardtemplate"
          element={
            <PrivateRoute>
              <Cardtemplate />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
