import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";
import Logo from "../assets/Logo.jpg";

import { CartContext } from "../context/CartContext";
import { SearchContext } from "../context/SearchContext";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const { cart } = useContext(CartContext);
  const { searchText, setSearchText } = useContext(SearchContext);

  const navigate = useNavigate();
  const location = useLocation();
  const showSearchBox = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

      return (
      <nav className="navbar">
      <img src={Logo} alt="logo" className="img-logo" />
      <h1 className="text-logo">📱 Mobile World</h1>

      {showSearchBox ? (
        <input
          type="text"
          placeholder="Search products..."
          className="search-box"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        /> ) : null }

      <ul className="navbar-link">
        <li>
          <Link to="/">Shop 🛍️</Link>
        </li>

        <li>
          <Link to="/cart">Cart 🛒 ({cart.length})</Link>
        </li>

        {isLoggedIn ? (
          <li>
            <button className="btn" onClick={handleLogout}> Logout </button>
          </li>) : 
          ( <li>
             <button className="btn"> <Link to="/login">Login</Link> </button>
          </li> )}
      </ul>
    </nav>
  );
}
