import React from "react";
import './../styles/Header.scss';
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <h1>VOLUNTEER APP</h1>
      <nav>
        <Link to="/volunteer/login">
          <button>VOLUNTEER SIGN IN</button>
        </Link>
        <Link to="/organization/login">
          <button>ORGANIZATION SIGN IN</button>
        </Link>
      </nav>
    </header>
  );
}
export default Header;
