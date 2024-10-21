import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar w-full">
      <div className="logo">
        <Link to="/">MyApp</Link>
      </div>
    </nav>
  );
};

export default Navbar;