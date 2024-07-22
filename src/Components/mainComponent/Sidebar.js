import React from 'react';
import { NavLink } from 'react-router-dom';
import './StylesComponents/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src="path-to-profile-image" alt="Profile" className="profile-pic" />
      <NavLink to="/choices" activeClassName="active">Choices</NavLink>
      <NavLink to="/goals" activeClassName="active">Goals</NavLink>
      <NavLink to="/monthly-goals" activeClassName="active">Monthly Goals</NavLink>
      <NavLink to="/habits" activeClassName="active">Habits</NavLink>
      <NavLink to="/observations" activeClassName="active">Observations</NavLink>
      <NavLink to="/sign-out" activeClassName="active">Sign Out</NavLink>
    </div>
  );
};

export default Sidebar;
