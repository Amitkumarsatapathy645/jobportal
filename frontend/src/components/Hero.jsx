import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="hero">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="hero-title"
      >
        Find Your Dream Job Today
      </motion.h1>
      <motion.h4
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="hero-subtitle"
      >
        Connecting Talent with Opportunities Across the Nation for Every Skill Level
      </motion.h4>
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Discover thousands of career opportunities across diverse industries.
        From entry-level positions to executive roles, we connect talented
        professionals like you with their ideal jobs. Our cutting-edge platform
        streamlines your job search, making it easier than ever to find and
        apply for positions that match your skills and aspirations.
      </motion.div>
    </section>
  );
};

export default Hero;
