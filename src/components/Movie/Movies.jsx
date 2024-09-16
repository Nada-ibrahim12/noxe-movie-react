import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Movies() {
  let [trindeingMovies, setTrindeingMovies] = useState([]);
  let num = new Array(13).fill(1).map((element, i) => i + 1)

  async function getMovies(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=c9fac173689f5f01ba1b0420f66d7093&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`)
    setTrindeingMovies(data.results)
  }
  useEffect(() => {
    getMovies(num)
  }, [])
  return (
    <>
      {trindeingMovies ? <div className="row justify-content-center">
        {trindeingMovies.map((movie, i) => <div key={i} className='col-md-2'>
          <Link to={`/moviedetails/${movie.id}`}>
            <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="" />
            <h3 className='h6 my-3'>{movie.title}</h3>
          </Link>
        </div>)}
        <nav className='d-flex justify-content-center my-5'>
          <ul className="pagination pagination-sm">
            {num.map((num) => <li key={num} onClick={() => getMovies(num)} className="page-item"><a className="page-link" href="#">{num}</a></li>)}
          </ul>
        </nav>
      </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>
        <i className='fas fa-spinner fa-spin' ></i>
      </div>}


    </>
  )
}
