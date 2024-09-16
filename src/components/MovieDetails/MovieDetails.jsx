import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
    let [movie_id, setMovie_id] = useState(null)
    let parm = useParams();
    let url_id = parm.id
    async function getmovie(id) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093&language=eg-US`)
        setMovie_id(data);
    }
    useEffect(() => {
        getmovie(url_id);
    }, [])
    return (
        <>
            {movie_id ? <div className="row">
                <div className="col-md-3">
                    <img className='w-100' src={'https://image.tmdb.org/t/p/w500' + movie_id?.backdrop_path} alt="" />
                </div>
                <div className="col-md-9">
                    <h3>{movie_id?.title}</h3>
                    <p className=' my-3'>${movie_id?.overview}</p>
                    <ul>
                        <li>Budget : {movie_id?.budget}</li>
                        <li>vote Count : {movie_id?.vote_count}</li>
                    </ul>
                </div>
            </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>
                <i className='fas fa-spinner fa-spin' ></i>
            </div>}

        </>
    )
}
