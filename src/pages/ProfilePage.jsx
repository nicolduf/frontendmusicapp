import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function ProfilePage() {
  const [userDB, setUserDB] = useState(null);
  const { user } = useContext(AuthContext);
  const apiUrl = user ? `${import.meta.env.VITE_API_URL}/api/users/${user.userId}` : null;

  useEffect(() => {
    if (!apiUrl) {
      return;
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userData) => {
        console.log(userData);
        setUserDB(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [apiUrl]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userDB ? (
        <>
          <img src={userDB.image} alt={userDB.name} className="userImage" />
          <h1>
            {userDB.name} {userDB.lastName}
          </h1>
          <p>{userDB.location}</p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default ProfilePage;
