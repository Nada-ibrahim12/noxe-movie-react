import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  let [isLoding, setIsLoading] = useState(false);
  let [error, setError] = useState([]);
  let navigate = useNavigate();

  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  function getUser(e) {
    let userData = { ...user }; //deep copy
    userData[e.target.name] = e.target.value;
    setUser(userData);
  }

  async function submitLoginForm(e) {
    setIsLoading(true);
    e.preventDefault();
    let validateResult = valdation();
    if (validateResult.error) {
      setIsLoading(false);
      setError(validateResult.error.details);
      console.log(validateResult.error.details);
    } else {
      setError([]);
      setIsLoading(true);
      navigate("/Home");
    }
  }

  function valdation() {
    let schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      <div className="w-75 mx-auto">
        <h2 className="text-center">Login Now</h2>
        {error.map((error, i) =>
          error.type === "string.pattern.base" ? (
            <div key={i} className="alert alert-danger">
              password invalid
            </div>
          ) : (
            <div key={i} className="alert alert-danger">
              {error.message}
            </div>
          )
        )}
        <form onSubmit={submitLoginForm}>
          <label htmlFor="email">email : </label>
          <input
            onChange={getUser}
            className="form-control mb-2"
            type="email"
            id="email"
            name="email"
          />

          <label htmlFor="password">password : </label>
          <input
            onChange={getUser}
            className="form-control mb-2"
            type="password"
            id="password"
            name="password"
          />

          <button type="submit" className="btn btn-outline-info my-2">
            {isLoding ? <i className="fas fa-spinner fa-spin"></i> : "Login"}{" "}
          </button>
        </form>
      </div>
    </>
  );
}
