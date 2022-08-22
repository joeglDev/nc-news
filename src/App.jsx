import './App.css';
import Navbar from './components/Navbar.jsx';
import Articles from './components/Articles.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
    <Route path='/' element={<Articles/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
