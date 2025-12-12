import React from "react";
import UserCard from "./UserCard";

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {users.map((user, index) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};

export default UserList;

