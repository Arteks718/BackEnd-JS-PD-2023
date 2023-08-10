import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const httpClient = axios.create({baseURL: 'http://localhost:5000/api'})

function App() {
  const [users, setUsers] = useState([{ firstName: 'Test' }])
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsFetching(true)
    httpClient.get('/users')
      .then(({data} )=> {
        setUsers(data)
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => setIsFetching(false))
  },[])

  return (
    <>
      {error && <div>Error!</div>}
      {isFetching && <div>Loading...</div>}
      <ul>
        Users: { users.map(user => (<li>{ JSON.stringify(user)}</li>))}
      </ul>
    </>
  );
}

export default App;
