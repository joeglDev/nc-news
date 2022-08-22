import './App.css';
import Navbar from './components/Navbar.jsx';
import Articles from './components/Articles.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topics from './components/Topics.jsx';
import ArticleByTopic from './components/ArticleByTopic.jsx';

function App() {


  return (
    <>
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
    <Route path='/' element={<Articles/>}></Route>
    <Route path='/articles/topics' element={<Topics/>}></Route>
    <Route path='/articles/topics/:slug' element={<ArticleByTopic/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
