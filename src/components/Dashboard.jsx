import React from 'react';

function Dashboard({ userEmail, onLogout }) {
  return (
    <section className="dashboard" aria-label="Dashboard">
      <h2>Welcome, {userEmail}</h2>
      <p>You have successfully logged in.</p>
      <button className="logout-btn" onClick={onLogout} aria-label="Logout">
        <span className="material-icons" aria-hidden="true" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
          logout
        </span>
        Logout
      </button>
    </section>
  );
}

export default Dashboard;
