import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container">
    <Link className="navbar-brand" to="home">Noxe</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="people">People</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="tv">Tv</Link>
        </li>
      </ul>
      <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
        <li className="nav-item  d-flex align-items-center order-sm-last order-lg-0">
        <i className='fab me-2 fa-facebook'  ></i>
        <i className='fab me-2 fa-twitter'  ></i>
        <i className='fab me-2 fa-instagram'  ></i>
        <i className='fab me-2 fa-spotify'  ></i>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        <li className="nav-item">
          <span className="nav-link" to="logout">LogOut</span>
        </li>

      </ul>

    </div>
  </div>
</nav>
    </div>
  )
}
