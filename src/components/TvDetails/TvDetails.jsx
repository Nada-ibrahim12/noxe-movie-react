import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TvDetails() {
  const [tvId, setTvId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: urlId } = useParams();

  async function getTv(id) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093&language=en-US`
      );
      setTvId(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (urlId) {
      getTv(urlId);
    }
  }, [urlId]);

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <i className="fas fa-spinner fa-spin"></i>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <p>Error loading tv details.</p>
      </div>
    );
  }

  return (
    <div>
      {tvId ? (
        <div className="row">
          <div className="col-md-3">
            <img
              className="w-100"
              src={"https://image.tmdb.org/t/p/w500" + tvId?.poster_path}
              alt={tvId?.name}
            />
          </div>
          <div className="col-md-9">
            <h3>{tvId?.name}</h3>
            <p>{tvId?.overview}</p>
            <ul>
              <li>Popularity: {tvId?.popularity}</li>
              <li>Air date: {tvId?.first_air_date}</li>
              <li>Vote Average: {tvId?.vote_average}</li>
              <li>Language: {tvId?.original_language}</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <p>No details available.</p>
        </div>
      )}
    </div>
  );
}
