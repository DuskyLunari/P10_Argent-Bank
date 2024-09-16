import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/auth.slice";

export function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.user.userName);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header>
      <nav className="main-nav">
        <NavLink className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src="/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
          {token && (
            <>
              <NavLink className="main-nav-item" to="/profile">
                <i className="fa fa-user-circle"></i>
                {userName}
              </NavLink>
              <NavLink 
                className="main-nav-item"
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <i className="fa fa-sign-out"></i>
                Logout
              </NavLink>
            </>
          )}
          {!token && (
            <NavLink className="main-nav-item" to="/sign-in">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}