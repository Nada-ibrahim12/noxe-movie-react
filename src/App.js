import { Route, Routes } from "react-router-dom";
import "./App.css";
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
  
  return (
    <>
      <MoviesContextProvider>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="movies" element={<Movies />} />
            <Route path="people" element={<People />} />
            <Route path="tv" element={<Tv />} />
            <Route path="moviedetails" element={<MovieDetails />}>
              <Route path=":id" element={<MovieDetails />} />
            </Route>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </MoviesContextProvider>
    </>
  );
}

export default App;
