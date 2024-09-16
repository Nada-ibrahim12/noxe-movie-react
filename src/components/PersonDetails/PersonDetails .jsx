import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PersonDetails() {
  const [personId, setPersonId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: urlId } = useParams();

  async function getPerson(id) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093&language=en-US`
      );
      setPersonId(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (urlId) {
      getPerson(urlId);
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
        <p>Error loading person details.</p>
      </div>
    );
  }

  return (
    <div>
      {personId ? (
        <div className="row">
          <div className="col-md-3">
            <img
              className="w-100"
              src={"https://image.tmdb.org/t/p/w500" + personId?.profile_path}
              alt={personId?.name}
            />
          </div>
          <div className="col-md-9">
            <h3>{personId?.name}</h3>
            <ul>
              <li>Popularity: {personId?.popularity}</li>
              <li>Department: {personId?.known_for_department}</li>
              <li>Place of birth: {personId?.place_of_birth}</li>
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
