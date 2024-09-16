import { Link } from 'react-router-dom';
import React from 'react';
import { useContext } from 'react';
import { MovieContext } from './Store';
export default function Home() {

  let { trindeingMovies, trindeingTv } = useContext(MovieContext)
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4 d-flex  align-items-center">
            <div>
              <div className="brd w-25 mb-4"></div>
              <h2 className='h3'>Trending <br /> Movies <br /> To Watch Right Now </h2>
              <p className='text-primary' >Top Trending Movies by Day</p>
              <div className="brd mt-4"></div>
            </div>
          </div>
          {trindeingMovies.map((movie, i) => <div key={i} className='col-md-2'>
            <Link to={`/moviedetails/${movie.id}`}>
              <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="" />
              <h3 className='h6 my-3'>{movie.title}</h3>
            </Link>
          </div>)}
        </div>
      </div>

    </>
  )
}
