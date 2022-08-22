import './App.css';
import Navbar from './components/Navbar.jsx';
import Articles from './components/Articles.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodingArticles from "./components/CodingArticles.jsx";
import CookingArticles from "./components/CookingArticles.jsx";
import FootballArticles from "./components/FootballArticles.jsx";

function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
    <Route path='/' element={<Articles/>}></Route>
    <Route path='/articles/topics/coding' element={<CodingArticles/>}></Route>
    <Route path='/articles/topics/cooking' element={<CookingArticles/>}></Route>
    <Route path='/articles/topics/football' element={<FootballArticles/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
