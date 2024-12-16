import React, { useState } from 'react';

function App() {
  const [page, setPage] = useState('home');

  // Navigation function
  const navigate = (newPage) => setPage(newPage);

  return (
    <div>
      <header>
        <button onClick={() => navigate('home')}>Home</button>
        <button onClick={() => navigate('users')}>Users</button>
        <button onClick={() => navigate('events')}>Events</button>
        <button onClick={() => navigate('vendor')}>Vendor</button>
      </header>
      
      <main>
        {page === 'home' && <div>Welcome to the Home Page</div>}
        {page === 'users' && <div>Manage Users</div>}
        {page === 'events' && <div>View Events</div>}
        {page === 'vendor' && <div>Vendor Details</div>}
      </main>
    </div>
  );
}

export default App;
