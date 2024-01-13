import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signin from './Pages/v1/(__auth__)/Signin'
import Signup from './Pages/v1/(__auth__)/SignUp'
import Home from './Pages/v1/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} /> {/* 👈 Renders at /app/ */}
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} /> 
          </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
