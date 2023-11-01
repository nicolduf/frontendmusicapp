import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/SongsDetails.css";

function SongDetailsPage() {
  const { _id } = useParams();
  const [song, setSong] = useState(null);
  const { user } = useContext(AuthContext);
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/songs/${_id}`;
  const navigate = useNavigate();

  useEffect(() => {
    if (_id) {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((songData) => {
          setSong(songData);
          console.log(songData);
        })
        .catch((error) => {
          console.error("Error fetching song data");
        });
    }
  }, [_id]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      fetch(apiUrl, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting song", error);
        });
    }
  };

  const handleAddToFavorites = () => {
    const songId = song._id;
    const userId = user.userId;
    console.log(user);

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/users/add-to-favourites/${userId}/${songId}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error adding song to favorites", error);
      });
  };

  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <div className="song-details-container">
      <div className="image-container">
        <img src={song.image} alt={song.title} className="songImage" />
      </div>
      <div className="info-container">
        <p className="songTitle">  
          {song.artist} - {song.title}
        </p>
        <p>{song.album}</p>
        <p>{song.genre}</p>
        <p>{song.label}</p>
        <p>{song.released}</p>
        <button className="delete-button" onClick={handleDelete}>
          Delete Song
        </button>
        <button className="favourites-button" onClick={handleAddToFavorites}>
          Add to Favorites
        </button>
      </div>
    </div>
  );
}

export default SongDetailsPage;
