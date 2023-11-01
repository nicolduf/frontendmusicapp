import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/ProfilePage.css";
import { Link } from "react-router-dom";

function ProfilePage() {
  const [userDB, setUserDB] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    image: "",
    location: "",
    username: "",
  });

  const { user } = useContext(AuthContext);
  const apiUrl = user
    ? `${import.meta.env.VITE_API_URL}/api/users/${user.userId}`
    : null;
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
        setUserDB(userData);
        setEditedUser({
          image: userData.image,
          location: userData.location,
          username: userData.username,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [apiUrl]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = (event) => {
    event.preventDefault();
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
            <div className="profile-page">
              <form onSubmit={handleSave}>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  value={editedUser.username}
                  onChange={handleChange}
                  className="update-username"
                />
                <br />
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={editedUser.location}
                  onChange={handleChange}
                  className="update-location"
                />
                <br />
                <label>Profile Picture</label>
                <input
                  type="text"
                  name="image"
                  value={editedUser.image}
                  onChange={handleChange}
                  className="update-image"
                />
                <br />
                <br />
                <div className="update-button-container">
                  <button>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </form>
            </div>
          ) : (
            <div className="profile-page">
              <div className="profile-section">
                <img
                  src={userDB.image}
                  alt={userDB.username}
                  className="userImage-profile"
                />
                <p className="username-font">{userDB.username}</p>
                <p className="location-font">{userDB.location}</p>
                <button className="edit-button" onClick={handleEditClick}>
                  Edit Profile
                </button>
              </div>
              <div className="favourites-section">
                <p className="songs-font">{userDB.username}'s Songs</p>
                <div className="favourite-songs-container">
                  {userDB.favouriteSongs &&
                    userDB.favouriteSongs.map((song, index) => (
                      <div key={index}>
                        <Link to={`/songs/${song._id}`}>
                          <img
                            src={song.image}
                            alt={song.title}
                            className="songImage-profile"
                          />
                        </Link>
                      </div>
                    ))}
                </div>
                <p className="artists-font">{userDB.username}'s Artists</p>
                <div className="favourites-artists-container">
                  {userDB.favouriteArtists &&
                    userDB.favouriteArtists.map((artist, index) => (
                      <div key={index}>
                        <Link to={`/artists/${artist._id}`}>
                          <img
                            src={artist.image}
                            alt={artist.name}
                            className="artistImage-profile"
                          />
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default ProfilePage;

