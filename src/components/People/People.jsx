import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import profile from "../../assets/profile.jpg";

export default function People() {
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const apiKey = "3f69a27835865c05f6ed1c043a44735a";

  async function getPeople(pageNumber) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/person?api_key=${apiKey}&language=en-US&page=${pageNumber}&sort_by=popularity.desc`
      );
      setTrendingPeople(response.data.results);
    } catch (error) {
      setError("Error fetching people.");
      console.error("Error fetching People shows:", error);
    }
  }

  useEffect(() => {
    getPeople(page);
  }, [page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  if (error) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {trendingPeople.length > 0 ? (
        <div className="row justify-content-center">
          {trendingPeople.map((person) => (
            <div key={person.id} className="col-md-2">
              <Link to={`/persondetails/${person.id}`}>
                <img
                  className="w-100"
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
