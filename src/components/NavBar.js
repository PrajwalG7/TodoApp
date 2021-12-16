import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
export default function NavBar({ user }) {
  const history = useHistory();
  return (
    <div>
      <nav>
        <div className="nav-wrapper blue">
          <Link to="/" className="brand-logo center ">
            Todo
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {user ? (
              <li>
                <button
                  className="btn red"
                  onClick={() => {
                    auth.signOut();
                    history.push("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
