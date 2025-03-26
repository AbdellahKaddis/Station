import React, { useEffect, useState } from 'react';
import './login-form.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom'
import { useUserContext } from '../../context/UserContext';
import userApi from '../../services/api/user/userApi';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState();
  const navigate = useNavigate();
  const {user,setUser,setToken,setIsAuthenticated,isAuthenticated} = useUserContext();
  useEffect(()=>{
    console.log(user);
    if(isAuthenticated)
    {
      if(user.role === 'admin')
        {
          navigate('/');
        }
        // else if (user.role === 'Admin')
        // {
        //   navigate('/admin/dashboard/orders');
        // }else if (user.role === 'Super Admin')
        // {
        //   navigate('/admin/dashboard');
        // }
    }
  },[user]);

  const  isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password){
      setError("Please fill out all fields.");
      return;
    }
    if(!isEmailValid(formData.email))
      {
          setError('Invalid email format.');
          return;
      }
      try {
        const {data} = await userApi.login(formData);

        setUser(data.user);
        setToken(data.token);
        setIsAuthenticated(true)
        switch(data.user.role)
        {
          case 'admin':
            navigate("/");
            break;
        //   case 'Super Admin':
        //     navigate('/admin/dashboard');
        //     break;
        //   case 'Admin':
        //       navigate('/admin/dashboard/orders');
        //       break;
            default:
              navigate("/");
        }
        
    } catch (err) {
        setError("Invalid email or password.")
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Welcome Back</h1>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            
          />
        </div>

        <p className="error-message">{error}</p>
        <button type="submit" className="login-button">Sign In</button>

      </form>
    </div>
  );
};

export default LoginForm;

