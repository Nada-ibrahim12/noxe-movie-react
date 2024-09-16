import { createContext, useState } from "react";

import axios from 'axios';
import React, { useEffect } from 'react';
export let MovieContext = createContext(0)

export function MoviesContextProvider(props){
    let [trindeingMovies, setTrindeingMovies] = useState([]);
    let [trindeingTv, setTrindeingTv] = useState([]);
    async function getMovies(mediaType, callback) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c9fac173689f5f01ba1b0420f66d7093`)
        callback(data.results.slice(0, 10))

  }

  useEffect(() => {
    getMovies("movie", setTrindeingMovies)
    getMovies("tv", setTrindeingTv)
  }, [])
    return <MovieContext.Provider value={{trindeingMovies,trindeingTv}}>
        {props.children}
    </MovieContext.Provider>
}