import React from 'react';
import classes from './customStyle.module.css';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userSliceActions } from '../../state_slice/userSlice';

export default function Header() {
  const dispatch = useDispatch();
  const { pathname } = useLocation(); // this will track the current browser url path at all time | useLocation will also re-render the target component whenever the url is changing

  const { userState } = useSelector((state) => {
    return state.userReducer;
  });

  const totalItemCount = useSelector((state) => {
    return state.cartReducer.totalItemCount;
  });

  //----------------------------------------------------------------------------------------------------------------

  function logOutHandler() {
    dispatch(userSliceActions.userLogOut());
  }

  return (
    <header>
      <nav className={'navbar navbar-expand-lg navbar-dark bg-dark mb-5'}>
        <div className="container">
          <Link className="navbar-brand" to="/">
            ProShop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <i className={`${classes['icon-custom']} fas fa-shopping-cart`}></i>
                  <span>Cart {totalItemCount !== 0 && `(${totalItemCount})`}</span>
                </Link>
              </li>
              {userState.authSuccess ? (
                <li className="nav-item dropdown">
                  <button className="btn nav-link dropdown-toggle" id="navbarDropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className={`${classes['icon-custom']} fa-solid fa-user`}></i>
                    {userState.authSuccess.username}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <span>Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/" onClick={logOutHandler}>
                        <span>Logout</span>
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : pathname === '/signin' || pathname === '/signup' ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signin"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <i className={`${classes['icon-custom']} fas fa-user`}></i>
                    <span>Sign in</span>
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/signin" state={{ pathBeforeAuth: pathname }}>
                    <i className={`${classes['icon-custom']} fas fa-user`}></i>
                    <span>Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
