import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let [isLoding, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
  });

  function getUser(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function submitRegisterForm(e) {
    e.preventDefault();
    let statusError = validation();
    if (statusError?.error) {
      setErrors(statusError?.error.details);
    } else {
      setIsLoading(true);
      axios
        .post("http://hawas.runasp.net/api/v1/Register", formData)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("currentUser", formData.email);
          setIsLoading(false);
          navigate("/Login");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          setError(err.response?.data?.message || "Registration failed");
        });
    }
  }

  function validation() {
    let schema = Joi.object({
      userName: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      password: Joi.string()
        .min(8)
        .max(30)
        .pattern(
          new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"
          )
        )
        .required()
        .messages({
          "string.base": "Password must be a string",
          "string.empty": "Password cannot be empty",
          "string.min": "Password must be at least {#limit} characters long",
          "string.max":
            "Password must be less than or equal to {#limit} characters",
          "string.pattern.base":
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
          "any.required": "Password is required",
        }),
      rePassword: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords do not match",
      }),
      dateOfBirth: Joi.date().iso().max("2020-12-31").required().messages({
        "date.max": "You must be born before 2021",
      }),
    });
    return schema.validate(formData, { abortEarly: false });
  }

  return (
    <>
      <div className="w-75 mx-auto mt-5">
        <h2 className="text-center mb-4">Register Now</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {errors.map((error, i) => (
          <div key={i} className="alert alert-danger">
            {error.message}
          </div>
        ))}
        <form onSubmit={submitRegisterForm}>
          <label htmlFor="userName">User Name:</label>
          <input
            onChange={getUser}
            className="form-control mb-4"
            type="text"
            id="userName"
            name="userName"
          />

          <label htmlFor="email">Email:</label>
          <input
            onChange={getUser}
            className="form-control mb-4"
            type="email"
            id="email"
            name="email"
          />

          <label htmlFor="dateOfBirth">Birth Date:</label>
          <input
            onChange={getUser}
            className="form-control mb-4"
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
          />

          <label htmlFor="password">Password:</label>
          <input
            onChange={getUser}
            className="form-control mb-4"
            type="password"
            id="password"
            name="password"
          />

          <label htmlFor="rePassword">Confirm Password:</label>
          <input
            onChange={getUser}
            className="form-control mb-4"
            type="password"
            id="rePassword"
            name="rePassword"
          />

          <button type="submit" className="btn btn-outline-info my-2">
            {isLoding ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
