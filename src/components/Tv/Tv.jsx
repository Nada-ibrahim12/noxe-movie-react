import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Tv() {
  const [trendingTv, setTrendingTv] = useState([]);
  const [page, setPage] = useState(1);
  const apiKey = "3f69a27835865c05f6ed1c043a44735a";

  async function getTv(pageNumber) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&page=${pageNumber}&sort_by=popularity.desc`
      );
      setTrendingTv(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  }

  useEffect(() => {
    getTv(page);
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div>
      {trendingTv.length > 0 ? (
        <div className="row justify-content-center">
          {trendingTv.map((tv, i) => (
            <div key={i} className="col-md-2">
              <Link to={`/tvdetails/${tv.id}`}>
                <img
                  className="w-100"
                  src={"https://image.tmdb.org/t/p/w500" + tv.poster_path}
                  alt={tv.name}
                />
                <h3 className="h6 my-3">{tv.name}</h3>
              </Link>
            </div>
          ))}
          <nav className="d-flex justify-content-center my-5">
            <ul className="pagination pagination-sm">
              {[1, 2, 3, 4, 5].map((num) => (
                <li
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`page-item ${num === page ? "active" : ""}`}
                >
                  <a className="page-link" href="#">
                    {num}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      )}
    </div>
  );
}
