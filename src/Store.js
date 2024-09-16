import { createContext, useState } from "react";

import axios from 'axios';
import React, { useEffect } from 'react';
export let DataContext = createContext(0)

export function DataContextProvider(props) {
  let [trendingMovies, setTrendingMovies] = useState([]);
  let [trendingTv, setTrendingTv] = useState([]);
  let [trendingPeople, setTrendingPeople] = useState([]);
  async function getData(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=c9fac173689f5f01ba1b0420f66d7093`)
    callback(data.results.slice(0, 10))

  }

  useEffect(() => {
    getData("movie", setTrendingMovies)
    getData("tv", setTrendingTv)
    getData("person", setTrendingPeople)

  }, [])
  return <DataContext.Provider value={{ trendingMovies, trendingTv, trendingPeople }}>
    {props.children}
  </DataContext.Provider>
}