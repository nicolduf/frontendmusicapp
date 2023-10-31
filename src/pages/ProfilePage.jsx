import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function ProfilePage() {
  const [userDB, setUserDB] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  const { user } = useContext(AuthContext);
  const apiUrl = user ? `${import.meta.env.VITE_API_URL}/api/users/${user.userId}` : null;
  const navigate = useNavigate();

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

  const handleEditClick = () => {
    setEditedUser(userDB);
    setEditing(true);
  };

  const handleSave = (event) => {
    event.preventDefault()
    fetch(`${import.meta.env.VITE_API_URL}/api/users/${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((updatedUserData) => {
        setUserDB(updatedUserData);
        setEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user data", error);
      });
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {userDB ? (
        <>
          {editing ? (
            <div>
              <form onSubmit={handleSave}> 
                <label>Username
                <input
                  type="text"
                  name="username"
                  value={editedUser.username}
                  onChange={handleChange}
                  className="update-username"
                />
                </label>
                <br />
                <label>Location </label>
                <input
                  type="text"
                  name="location"
                  value={editedUser.location}
                  onChange={handleChange}
                  className="update-location"
                />
                <br />
                <label>Profile Picture </label>
                <input
                  type="text"
                  name="location"
                  value={editedUser.image}
                  onChange={handleChange}
                  className="update-image"
                />
                <br />
                <br />
                <button>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </form>
            </div>
          ) : (
            <>
              <img src={userDB.image} alt={userDB.username} className="userImage" />
              <h1>{userDB.username}</h1>
              <p>{userDB.location}</p>
              <button onClick={handleEditClick}>Edit Profile</button>
            </>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default ProfilePage;
