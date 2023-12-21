import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import AuthService from '../../../services/AuthServices';
import { useAuth } from '../../../utils/AuthContext';
import logo from '../../../assets/img/logo1.png'

const loginAPI = new AuthService('https://icec-auth-yoangelcruz.cloud.okteto.net/api');

function Login(isMobile) {
  const navigate = useNavigate();
  const { authLogin, tipoUsuario } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    contraseña: '',
  });
  
  useEffect(() => {
    const verification = () => {
      switch (tipoUsuario) {
        case 'alumno':
          navigate('/estudiantes/home');
          break;
        case 'profesor':
          navigate('/maestros/home');
          break;
        case 'administrador':
          navigate('/admin/home');
          break;
        default:
          // Manejo para otros casos si es necesario
          break;
      }
    };

    // Verifica el tipo de usuario cuando el componente se monta
    verification();
  }, [tipoUsuario, navigate]); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //API ---
  const handleLogin = async() => {
    console.log(formData); 
    try{
      const response = await loginAPI.login(formData);
      const { userData, tipoUsuario, token } = response;
      // Llama a la función de inicio de sesión del contexto de autenticación
      console.log('-----------------',tipoUsuario);
      const expiresIn =2 * 3600;
      authLogin(userData, tipoUsuario, token, expiresIn);

      switch (tipoUsuario) {
        case 'alumno':
          alert("bienvenido estudiante");
          navigate('/estudiantes/home');
          break;
        case 'profesor':
          alert("bienvenido maestro");
          navigate('/maestros/home');
          break;
        case 'administrador':
          alert("bienvenido administrador");
          navigate('/admin/home');
          break;
        default:
          // Manejo para otros casos si es necesario
          break;
      }
    }catch (error) {
        alert(error);
      }
  };


  return (
    <div className="loginCont">
      <div className='loginModularCont'>
        <div className="leftPanel">
          <img src={logo} alt="logo" width={'100%'} />
        </div>
        <div className="rightPanel">
          <p className='loginTitle'>Iniciar Sesión</p>
          <form>
            <div className="form-group">
              <label>Email:</label><br/>
              <input type="text" name="email" onChange={handleChange} value={formData.email} style={{width: '100%'}}/>
            </div>
            <div className="form-group">
              <label>Password:</label><br/>
              <input type="password" name="contraseña" onChange={handleChange} value={formData.contraseña} style={{width: '100%'}}/>
            </div>
            <button type="button" onClick={handleLogin} style={{width: '100%'}}>
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;