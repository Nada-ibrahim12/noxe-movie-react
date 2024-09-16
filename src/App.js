import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./NavBar";
import Home from "./Home";
import Movies from "./Movies";
import People from "./People";
import Tv from "./Tv";
import Register from "./Register";
import Login from "./Login";
import NotFound from "./NotFound";
import MovieDetails from "./MovieDetails";
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
