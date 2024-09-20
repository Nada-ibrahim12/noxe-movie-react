import { Link } from "react-router-dom";
import React from "react";
import { useContext } from "react";
import { DataContext } from "../../Store";
import profile from "../../assets/profile.jpg";

export default function Home() {
  let { trendingMovies, trendingTv, trendingPeople } = useContext(DataContext);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 d-flex  align-items-center">
            <div>
              <div className="brd w-25 mb-4"></div>
              <h2 className="h3">
                Trending <br /> Movies <br /> To Watch Right Now
              </h2>
              <p className="text-primary">Top Trending Movies by Day</p>
              <div className="brd mt-4"></div>
            </div>
          </div>
          {trendingMovies.map((movie, i) => (
            <div key={i} className="col-md-2">
              <Link to={`/moviedetails/${movie.id}`}>
                <img
                  className="w-100"
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  alt=""
                />
                <h3 className="h6 my-3">{movie.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 d-flex  align-items-center">
            <div>
              <div className="brd w-25 mb-4"></div>
              <h2 className="h3">
                Trending <br /> Tv <br /> To Watch Right Now
              </h2>
              <p className="text-primary">Top Trending Tv by Day</p>
              <div className="brd mt-4"></div>
            </div>
          </div>
          {trendingTv.map((tv, i) => (
            <div key={i} className="col-md-2">
              <Link to={`/tvdetails/${tv.id}`}>
                <img
                  className="w-100"
                  src={"https://image.tmdb.org/t/p/w500" + tv.poster_path}
                  alt=""
                />
                <h3 className="h6 my-3">{tv.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="container mt-5">
        <div className="row gy-5">
          <div className="col-md-4 d-flex  align-items-center">
            <div>
              <div className="brd w-25 mb-4"></div>
              <h2 className="h3">
                Trending <br /> People <br /> To Watch Right Now
              </h2>
              <p className="text-primary">Top Trending People by Day</p>
              <div className="brd mt-4"></div>
            </div>
          </div>
          {trendingPeople.map((person, i) => (
            <div key={i} className="col-md-2">
              <Link to={`/persondetails/${person.id}`}>
                <img
                  className="w-100 h-100"
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                      : profile
                  }
                  alt={person.name}
                />
                <h3 className="h6 my-3">{person.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
