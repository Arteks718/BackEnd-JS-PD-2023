import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const httpClient = axios.create({baseURL: 'http://localhost:5000'})

function App() {
  const [users, setUsers] = useState([{ firstName: 'Test' }])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    httpClient.get('/api/')
  },[])

  return (
    <>
      {error && <div>Error!</div>}
      {isFetching && <div>Loading...</div>}
      <ul>
        Users: { users.map(user => (<li>{ JSON.stringify(user.firstName)}</li>))}
      </ul>
    </>
  );
}

export default App;
