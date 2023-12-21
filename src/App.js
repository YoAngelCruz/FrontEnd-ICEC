import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider, useAuth, isTokenExpired } from './utils/AuthContext';
import Estudiantes from './components/pages/estudiantes';
import Maestros from './components/pages/maestros';
import Admin from './components/pages/admin';
import Inicio from './components/pages/inicio';
import Login from './components/pages/login/';

const PrivateRoute = ({ element, allowedTypes }) => {
  const { isAuthenticated, tipoUsuario } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (!allowedTypes.includes(tipoUsuario) || isTokenExpired()) {
    return <Navigate to="/" />;
  }

  if (!allowedTypes.includes(tipoUsuario)) {
    if (tipoUsuario==='alumno'){
      return <Navigate to="/estudiantes/" />;
    }
    else if (tipoUsuario==='profesor'){
      return <Navigate to="/maestros/" />;
    }
    else if (tipoUsuario==='administrador'){
      return <Navigate to="/admin/" />;
    }
    
  }

  return element;
};

function App() {
  const currentUrl = window.location.pathname;
  console.log(currentUrl);
  
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route
              path="/estudiantes/*"
              element={<PrivateRoute element={<Estudiantes />} allowedTypes={['alumno']} />}
            />
            <Route
              path="/maestros/*"
              element={<PrivateRoute element={<Maestros />} allowedTypes={['profesor']} />}
            />
            <Route
              path="/admin/*"
              element={<PrivateRoute element={<Admin />} allowedTypes={['administrador']} />}
            />
            <Route path="/login" element={<Login />} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
