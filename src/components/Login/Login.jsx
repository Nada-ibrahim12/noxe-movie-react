import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import Joi from "joi";

export default function Login({ saveDataUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const getData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationErrors = validation();
    if (validationErrors) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    axios
      .post("http://hawas.runasp.net/api/v1/Login", formData)
      .then((res) => {
        localStorage.setItem("Token", res.data.jwt);
        localStorage.setItem("currentUser", formData.email);
        saveDataUser(); // Update the userData in App component
        navigate("/home"); // Navigate to home after successful login
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Invalid email or password");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const validation = () => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
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
    });

    const { error } = schema.validate(formData, { abortEarly: false });
    return error ? error.details : null;
  };

  return (
    <div className="w-75 mx-auto mt-5">
      <h2 className="text-center mb-4">Login Now</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {errors.map((err, i) =>
        err.type === "string.pattern.base" ? (
          <div key={i} className="alert alert-danger">
            Password invalid
          </div>
        ) : (
          <div key={i} className="alert alert-danger">
            {err.message}
          </div>
        )
      )}
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email: </label>
        <input
          onChange={getData}
          className="form-control mb-4"
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password: </label>
        <input
          onChange={getData}
          className="form-control mb-4"
          type="password"
          id="password"
          name="password"
        />
        <button type="submit" className="btn btn-outline-info my-2">
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
        </button>
      </form>
    </div>
  );
}
