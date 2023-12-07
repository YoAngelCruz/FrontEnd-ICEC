import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Estudiantes from './components/pages/estudiantes';
import Maestros from './components/pages/maestros';
import Admin from './components/pages/admin';
import Inicio from './components/pages/inicio';
import Login from './components/pages/login/';
function App() {
  const currentUrl = window.location.pathname;
  console.log(currentUrl);
  return (
    <BrowserRouter>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/estudiantes/*" element={<Estudiantes />} />
          <Route path="/maestros/*" element={<Maestros />} />
          <Route path="/admin/*" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
