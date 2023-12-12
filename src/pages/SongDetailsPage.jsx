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

  const handleRemoveFromFavorites = () => {
    const songId = song._id;
    const userId = user.userId;

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/users/remove-from-favourites/${userId}/${songId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error removing song from favorites", error);
      });
  };

  const handleAddToFavorites = () => {
    const songId = song._id;
    const userId = user.userId;

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
      <div className="info-container">
        <p className="songTitle">{song.title}</p>
        <p className="songArtist">{song.artist}</p>
        <p className="songAlbum">{song.album}</p>
        <p className="songGenre">{song.genre}, {song.released}</p>
        <div>
          <button className="favourites-button" onClick={handleAddToFavorites}>
            Add to Favorites
          </button>
          <button className="remove-button" onClick={handleRemoveFromFavorites}>
            Remove from Favorites
          </button>
        </div>
      </div>
      <div className="image-container">
        <img src={song.image} alt={song.title} className="songImage" />
      </div>
    </div>
  );
}

  export default SongDetailsPage;
