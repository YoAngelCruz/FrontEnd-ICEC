import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Estudiantes from './components/pages/estudiantes';

function App() {
  const currentUrl = window.location.pathname;
  console.log(currentUrl);
  return (
    <BrowserRouter>
      <div className="App">
        
        <Routes>
          <Route path="/estudiantes/*" element={<Estudiantes />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
