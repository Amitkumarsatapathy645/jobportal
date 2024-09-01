import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { LuMoveRight } from "react-icons/lu";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";

const sidebarVariants = {
  open: { width: "250px", transition: { duration: 0.3 } },
  closed: { width: "60px", transition: { duration: 0.3 } },
};

const contentVariants = {
  enter: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, loading, isAuthenticated]);

  return (
    <>
      <section className="account">
        <div className="component_header">
          <p>Dashboard</p>
          <p>
            Welcome! <span>{user && user.name}</span>
          </p>
        </div>
        <div className="container">
          <motion.div
            className={show ? "sidebar showSidebar" : "sidebar"}
            variants={sidebarVariants}
            animate={show ? "open" : "closed"}
          >
            <ul className="sidebar_links">
              <h4>Manage Account</h4>
              <li>
                <button
                  onClick={() => {
                    setComponentName("My Profile");
                    setShow(!show);
                  }}
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setComponentName("Update Profile");
                    setShow(!show);
                  }}
                >
                  Update Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setComponentName("Update Password");
                    setShow(!show);
                  }}
                >
                  Update Password
                </button>
              </li>

              {user && user.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("Job Post");
                      setShow(!show);
                    }}
                  >
                    Post New Job
                  </button>
                </li>
              )}
              {user && user.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("My Jobs");
                      setShow(!show);
                    }}
                  >
                    My Jobs
                  </button>
                </li>
              )}
              {user && user.role === "Employer" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("Applications");
                      setShow(!show);
                    }}
                  >
                    Applications
                  </button>
                </li>
              )}
              {user && user.role === "Job Seeker" && (
                <li>
                  <button
                    onClick={() => {
                      setComponentName("My Applications");
                      setShow(!show);
                    }}
                  >
                    My Applications
                  </button>
                </li>
              )}
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </motion.div>
          <div className="banner">
            <motion.div
              className={
                show ? "sidebar_icon move_right" : "sidebar_icon move_left"
              }
            >
              <LuMoveRight
                onClick={() => setShow(!show)}
                className={show ? "left_arrow" : "right_arrow"}
              />
            </motion.div>
            <AnimatePresence>
              {(() => {
                switch (componentName) {
                  case "My Profile":
                    return (
                      <motion.div
                        key="MyProfile"
                        variants={contentVariants}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                      >
                        <MyProfile />
                      </motion.div>
                    );
                  case "Update Profile":
                    return (
                      <motion.div
                        key="UpdateProfile"
                        variants={contentVariants}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                      >
                        <UpdateProfile />
                      </motion.div>
                    );
                  case "Update Password":
                    return (
                      <motion.div
                        key="UpdatePassword"
                        variants={contentVariants}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                      >
                        <UpdatePassword />
                      </motion.div>
                    );
                  case "Job Post":
                    return (
                      <motion.div
                        key="JobPost"
                        variants={contentVariants}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                      >
                        <JobPost />
                      </motion.div>
                    );
                  case "My Jobs":
                    return (
                      <motion.div
                        key="MyJobs"
                        variants={contentVariants}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                      >
                        <MyJobs />
                      </motion.div>
                    );
                  case "Applications":
                    return (
                      <motion.div
                        key="Applications"
                        variants={contentVariants}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                      >
                        <Applications />
                      </motion.div>
                    );
                  case "My Applications":
                    return (
                      <motion.div
                        key="MyApplications"
                        variants={contentVariants}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                      >
                        <MyApplications />
                      </motion.div>
                    );
                  default:
                    return (
                      <motion.div
                        key="MyProfileDefault"
                        variants={contentVariants}
                        initial="exit"
                        animate="enter"
                        exit="exit"
                      >
                        <MyProfile />
                      </motion.div>
                    );
                }
              })()}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
