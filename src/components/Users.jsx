import { useState, useEffect } from "react";
import { getUsers } from "../utils/index.js";


const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('Testing')

  useEffect(() => {
    getUsers().then(({ users }) => {
      console.log(users);
      setUsers(users);
    });
  }, []);

  const changeUser = (username) => {
    setCurrentUser(username);
    console.log(currentUser)


  };

  return (
    <section>
      <h1>Users</h1>
      <ul>
        {users.map(({ username, avatar_url }) => {
          return (
            <li className="User__card" key={username}>
              <img alt={username} src={avatar_url}></img>
              <p>{username}</p>
              <button onClick={() => {changeUser(username)}}>Select user</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Users;
