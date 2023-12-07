import React, { useState, useEffect } from 'react';
import './login.css';
import AuthService from '../../../services/AuthServices';
import Cookies from 'universal-cookie';
import { isExpired, decodeToken } from "react-jwt";


const cookie = new Cookies();

const login = new AuthService('https://example.com/api/auth');
//const jwt = require('jsonwebtoken');

function Login() {
  const ttoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkNocmlzdGlhbkFSQGdtYWlsLmNvbSIsInRpcG9Vc3VhcmlvIjoicHJvZmVzb3IiLCJpYXQiOjE3MDA4ODc4OTAsImV4cCI6MTcwMDkwNTg5MH0.2AHWZHt2BGb70ZT4kHmpMETFyJCQW4-TR2oMwN7Kc58';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const changeHref = (tipoUsuario) =>{
    window.location.href =
      tipoUsuario === 'alumno' ? './estudiantes/home' :
      tipoUsuario === 'profesor' ? './maestros/home' :
      tipoUsuario === 'administrador' ? './admin/home' :
      window.location.href;
  };

  useEffect(() => {
    const myDecodedToken = isExpired(ttoken);
    console.log("tipo de usuario ", cookie.get('userType',{path:"/"}))
    if (!myDecodedToken) {
      alert("ya estas logeado");
      changeHref('profesor');
    }
  }, []);

  const handleLogin = async() => {
    const data={'email': username,'contraseña': password};
    console.log(data);
    try{
      const response = await login.login(data);
      const { userData, tipoUsuario, token } = response;
      // Almacenar en cookies
      cookie.set('userId', userData.id,{path:"/"});
      cookie.set('userType', tipoUsuario,{path:"/"});
      cookie.set('token', token,{path:"/"});
      console.log(cookie.get('userId',{path:"/"}));
      changeHref(cookie.get('userType',{path:"/"}));
  }catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h2>Iniciar Sesión</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </form>
      </div>
      <div className="right-panel">
        <p>¡Bienvenido!</p>
      </div>
    </div>
  );
}

export default Login;