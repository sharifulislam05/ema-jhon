import React, { useContext } from "react";
import "./_header.scss";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const signOut = () => {
    setLoggedInUser({});
  };
  return (
    <div>
      <div className="header__logo">
        <img src={logo} alt="dfds" />
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/shop" className="link">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/review" className="link">
                Review
              </Link>
            </li>
            <li>
              <Link to="/inventory" className="link">
                Manage Inventory
              </Link>
            </li>
            {loggedInUser.isSignIn ? (
              <li onClick={signOut} className="link text-danger">
                signOut
              </li>
            ) : (
              <li>
                <Link to="/login" className="link">
                  Login
                </Link>
              </li>
            )}
            <li className="text-warning">{loggedInUser.name}</li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
