import React from "react"
 const UserCard = ({user})=>{
    return (
        <div className="user-card">
            <img src={user.picture.thumbnail} alt="user" />
            <div className="user-info">
                <p> Name:{user.name.first}{user.name.last}</p>
                <p>Gender: {user.gender}</p>
                <p>Email:{user.email}</p>
            </div>
        </div>
    )

 }
 export default UserCard;