import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import './login.css';
import AuthService from '../../../services/AuthServices';
import { useAuth } from '../../../utils/AuthContext';
import logo from '../../../assets/img/logo1.png'
import {HiOutlineChevronLeft} from 'react-icons/hi2';

const loginAPI = new AuthService('https://icec-auth-yoangelcruz.cloud.okteto.net/api');

function Login(isMobile) {
  const navigate = useNavigate();
  const { authLogin, tipoUsuario, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    contraseña: '',
  });
  
  useEffect(() => {
    const verification = () => {
      if(isAuthenticated){
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
            break;
        }
      }
    };

    // Verifica el tipo de usuario cuando el componente se monta
    verification();
  }, [tipoUsuario, navigate, isAuthenticated]); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //API ---
  const handleLogin = async() => {
    try{
      const response = await loginAPI.login(formData);
      const { userData, tipoUsuario, token } = response;
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
          break;
      }
    }catch (error) {
      alert(error.response.data.error);
      }
  };

  return (
    <div className="loginCont">
      <div className='loginModularCont'>
      <NavLink className="backPanel" key='back' to='/' style={{ display:'flex', textDecoration:'none', color:'white', width:'fit-content', left:'0%'}} >
                <HiOutlineChevronLeft/><span className="buttonTitle">Regresar</span>
            </NavLink><br/>
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