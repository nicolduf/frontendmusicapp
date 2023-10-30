import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function ProfilePage() {
  const [userDB, setUserDB] = useState(null);
  const {user} = useContext(AuthContext)
  console.log("Im here", user)
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/users/${user.userId}`;

  useEffect(() => {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((userData) => {
          console.log(userData)
          setUser(userId);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);
  console.log(user)

  if (!user) {
    return <div>Loading...</div>;
  }
  

  return (
    <>
      <img src={user.image} alt={user.name} className="userImage" />
      <h1>
        {user.name} {user.lastName}
      </h1>
      <p>{user.location}</p>
    </>
  );
}

export default ProfilePage;
