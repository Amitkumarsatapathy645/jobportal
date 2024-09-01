import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import Spinner from "../components/Spinner";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [niche, setNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  const cities = [
    "Angul", "Boudh (Bauda)", "Bhadrak", "Balangir", "Bargarh (Baragarh)", "Balasore", 
    "Cuttack", "Debagarh (Deogarh)", "Dhenkanal", "Ganjam", "Gajapati", "Jharsuguda",
    "Jajpur", "Jagatsinghpur", "Khordha", "Kendujhar (Keonjhar)", "Kalahandi", 
    "Kandhamal", "Koraput", "Kendrapara", "Malkangiri", "Mayurbhanj", "Nabarangpur",
    "Nuapada", "Nayagarh", "Puri", "Rayagada", "Sambalpur", "Subarnapur (Sonepur)",
    "Sundergarh"
  ];

  const nichesArray = [
    "Software Development", "Web Development", "Cybersecurity", "Data Science", 
    "Artificial Intelligence", "Cloud Computing", "DevOps", "Mobile App Development", 
    "Blockchain", "Database Administration", "Network Administration", "UI/UX Design", 
    "Game Development", "IoT (Internet of Things)", "Big Data", "Machine Learning", 
    "IT Project Management", "IT Support and Helpdesk", "Systems Administration", 
    "IT Consulting"
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="jobs">
          <motion.div
            className="search-tab-wrapper"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FaSearch />
            <input
              type="text"
              value={searchKeyword}
              placeholder="Search for jobs..."
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button onClick={handleSearch}>Find Job</button>
          </motion.div>

          <div className="wrapper">
            <motion.div
              className="filter-bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="dropdowns">
                <h2>Filter Jobs</h2>
                <div className="dropdown">
                  <label htmlFor="city">Select City:</label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="">All Cities</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="dropdown">
                  <label htmlFor="niche">Select Niche:</label>
                  <select
                    id="niche"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  >
                    <option value="">All Niches</option>
                    {nichesArray.map((niche, index) => (
                      <option key={index} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <motion.div
                className="jobs_container"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {jobs &&
                  jobs.map((element) => (
                    <motion.div
                      className="card"
                      key={element._id}
                      whileHover={{ scale: 1.05 }}
                    >
                      {element.hiringMultipleCandidates === "Yes" ? (
                        <p className="hiring-multiple">
                          Hiring Multiple Candidates
                        </p>
                      ) : (
                        <p className="hiring">Hiring</p>
                      )}
                      <p className="title">{element.title}</p>
                      <p className="company">{element.companyName}</p>
                      <p className="location">{element.location}</p>
                      <p className="salary">
                        <span>Salary:</span> Rs. {element.salary}
                      </p>
                      <p className="posted">
                        <span>Posted On:</span>{" "}
                        {element.jobPostedOn.substring(0, 10)}
                      </p>
                      <div className="btn-wrapper">
                        <Link
                          className="btn"
                          to={`/post/application/${element._id}`}
                        >
                          Apply Now
                        </Link>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
