import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (gender = "") => {
    setLoading(true);
    try {
      let url = "https://randomuser.me/api/?results=10";
      if (gender) url += `&gender=${gender}`;
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data.results);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app-container">
      <h1>Random Users</h1>
      <div className="buttons">
        <button onClick={() => fetchUsers()}>All</button>
        <button onClick={() => fetchUsers("male")}>Male</button>
        <button onClick={() => fetchUsers("female")}>Female</button>
      </div>

      {loading ? <p>Loading...</p> : <UserList users={users} />}
    </div>
  );
}

export default App;
