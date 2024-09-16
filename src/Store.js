import { createContext, useState } from "react";

import axios from 'axios';
import React, { useEffect } from 'react';
export let MovieContext = createContext(0)

export function MoviesContextProvider(props) {
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [trendingTv, setTrendingTv] = useState([]);
  let [trendingPeople, setTrendingPeople] = useState([]);
  async function getMovies(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c9fac173689f5f01ba1b0420f66d7093`)
    callback(data.results.slice(0, 10))

  }

  useEffect(() => {
    getMovies("movie", setTrendingMovies)
    getMovies("tv", setTrendingTv)
    getMovies("person", setTrendingPeople)

  }, [])
  return <MovieContext.Provider value={{ trendingMovies, trendingTv, trendingPeople }}>
    {props.children}
  </MovieContext.Provider>
}