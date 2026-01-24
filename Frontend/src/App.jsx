import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Loader from "./components/Loader";
import StudyMaterial from "./components/StudyMaterial";

import { getCurrentUser } from "./store/authSlice";
import { Toaster } from "react-hot-toast"

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <>
    {/* Toast container */}
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          borderRadius: '8px',
          background: '#F8F9FA',
          color: '#023047',
        },
        success: {
          style: {
            background: '#80ED99',
            color: '#023047',
          },
        },
        error: {
          style: {
            background: '#ff8b8bec',
            color: '#fff',
          },
        },
      }}
    />

    {/* Routes */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/notes" element={<StudyMaterial />} />
    </Routes>
    </>
  );
}

export default App;