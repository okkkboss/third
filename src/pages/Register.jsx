import React from "react";
import { useState } from "react";
import validator from 'validator'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  
  const [err, setError] = useState('')

  const validate = (value) => {
    if (validator.isStrongPassword(value, {
      minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    })){
      
      setError('Is Strong Password')
    } else {
      
      setError('Is Not Strong Password')
    }

  }

  const [errs, setErrors] = useState('')
  const validateEmail = (value) => {
    if (validator.isEmail(value)){
      setErrors('Valid Email')
    } else {
      setErrors("Enter valid Email")
    }

  }


  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={(e) => validateEmail(e.target.value)}
          />
          <br/>
          {errs === '' ?null :
          <span style={{
            fontWeight: 'bold',
          }}>{errs}</span>}
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => validate(e.target.value)}
        />
        <br/>
        {err === '' ?null :
        <span style={{
          fontWeight: 'bold',color:'red',
        }}>{err}</span>}
        <button onClick={handleSubmit}>Register</button>
        
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;