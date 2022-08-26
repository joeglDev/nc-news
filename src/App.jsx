import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Articles from "./components/Articles.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topics from "./components/Topics.jsx";
import ArticleByTopic from "./components/ArticleByTopic.jsx";
import SingleArticle from "./components/SingleArticle";
import Errors from "./components/errors/Errors.jsx";
import Users from './components/Users.jsx';
import {useEffect, useState} from 'react';
import {getUsers} from './utils/index.js';
//set up global context
import { createContext } from 'react';
export const UserContext = createContext();



function App() {

  

    //assign user to global context
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("Testing");
 

  useEffect(() => {
    getUsers().then(({ users }) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser}}>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Articles />}></Route>
          <Route
            path="articles/:article_id"
            element={<SingleArticle />}
          ></Route>
          <Route path="/articles/topics" element={<Topics />}></Route>
          <Route
            path="/articles/topics/:slug"
            element={<ArticleByTopic />}
          ></Route>
          <Route path="/users" element={<Users users={users}/>}></Route>
          <Route path="*" element={<Errors />}></Route>
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
