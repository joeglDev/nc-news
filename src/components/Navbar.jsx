import { Link} from "react-router-dom";


const Navbar = () => {


  return (
    <nav>
      <ul>
        <li className="Navbar__li__logo">Northcoders News</li>
        <li>
          <Link to="/">All articles</Link>
        </li>
        <li>
          <Link to="/articles/topics">Topics</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
