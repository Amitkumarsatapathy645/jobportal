import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from 'framer-motion';

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <img 
              src="/Logo.png" 
              alt="logo" 
              style={{ width: '80px', height: 'auto', marginRight: '10px' }} 
            />
            <span className="company-name">JOBX</span>
          </Link>
        </div>
        <div className={`links ${show ? 'show' : ''}`}>
          <ul>
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to={"/"} onClick={() => setShow(false)}>
                HOME
              </Link>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link to={"/jobs"} onClick={() => setShow(false)}>
                JOBS
              </Link>
            </motion.li>
            {isAuthenticated ? (
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to={"/dashboard"} onClick={() => setShow(false)}>
                  DASHBOARD
                </Link>
              </motion.li>
            ) : (
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to={"/login"} onClick={() => setShow(false)}>
                  LOGIN
                </Link>
              </motion.li>
            )}
          </ul>
        </div>
        <div className="hamburger-container" onClick={() => setShow(!show)}>
          <GiHamburgerMenu className={`hamburger ${show ? 'active' : ''}`} />
        </div>
      </nav>

      {show && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.3 }}
        >
          <ul>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/jobs"} onClick={() => setShow(false)}>
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to={"/dashboard"} onClick={() => setShow(false)}>
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"} onClick={() => setShow(false)}>
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
