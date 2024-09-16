import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Register() {
  let[isLoding,setIsLoading]=useState(false)
  let[error,setError]=useState([])
  let navigate =useNavigate() ;

  let [user,setUser]=useState(
    {
      username:'',
      email:'',
      password:'',
      passwordConfirm:''
    }
  )
  function getUser(e){
      let userData = {...user} //deep copy
      userData[e.target.name] = e.target.value;
      setUser(userData);
  }

  async function submitRegisterForm(e){
    setIsLoading(true)
    e.preventDefault()
    let validateResult = valdation();
    if(validateResult.error)
   {
      setIsLoading(false)
      setError(validateResult.error.details)
   }
   else{
    setError([]);
    setIsLoading(true)
    navigate("/Login");
   }
  }

  function valdation(){
    let schema=Joi.object({
      username : Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      passwordConfirm : Joi.ref('password'),

    })
    return schema.validate(user,{abortEarly:false})

  }


  return (
    <>
    <div className='w-75 mx-auto'>
      <h2 className='text-center'>Register Now</h2>
      {error.map((error,i)=><div key={i} className='alert alert-danger' >{error.message}</div>)}
        <form onSubmit={submitRegisterForm}>
        <label htmlFor="username">user name : </label>
          <input onChange={getUser} className='form-control mb-2' type="text" id='username' name='username' />
          
          <label htmlFor="email">email : </label>
          <input onChange={getUser} className='form-control mb-2' type="email" id='email' name='email' />

          <label htmlFor="password">password : </label>
          <input onChange={getUser} className='form-control mb-2' type="password" id='password' name='password' />

          <label htmlFor="passwordConfirm">passwordConfirm : </label>
          <input onChange={getUser} className='form-control mb-2' type="password" id='passwordConfirm' name='passwordConfirm' />

          <button  type='submit' className='btn btn-outline-info my-2' >{isLoding ? <i className='fas fa-spinner fa-spin'></i>:"Register"} </button>

        </form>
    </div>
      
    </>
  )
}
