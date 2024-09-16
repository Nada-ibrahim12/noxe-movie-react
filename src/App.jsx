import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Movies from "./components/Movie/Movies";
import People from "./components/People/People";
import Tv from "./components/Tv/Tv";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { MoviesContextProvider } from "./Store";

function App() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    saveDataUser();
  }, []);

  function saveDataUser() {
    const token = localStorage.getItem("Token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserData(decoded);
    }
  }

  function logOut() {
    setUserData(null);
    localStorage.removeItem("Token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  function ProtectedRoute({ children }) {
    if (localStorage.getItem("Token") == null) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }

  return (
    <MoviesContextProvider>
      <NavBar userData={userData} logOut={logOut} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="movies"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route
            path="people"
            element={
              <ProtectedRoute>
                <People />
              </ProtectedRoute>
            }
          />
          <Route
            path="tv"
            element={
              <ProtectedRoute>
                <Tv />
              </ProtectedRoute>
            }
          />
          <Route
            path="moviedetails/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login saveDataUser={saveDataUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </MoviesContextProvider>
  );
}

export default App;
