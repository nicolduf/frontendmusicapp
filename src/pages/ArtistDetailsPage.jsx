import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import '../styles/ArtistDetails.css'

function ArtistDetailsPage() {
  const { _id } = useParams();
  const { user } = useContext(AuthContext);
  const [artist, setArtist] = useState(null);
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/artists/${_id}`;
  const navigate = useNavigate();

  useEffect(() => {
    if (_id) {
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((artistData) => {
          setArtist(artistData);
        })
        .catch((error) => {
          console.error("Error fetching artist data:", error);
        });
    }
  }, [_id]);

  const handleAddToFavorites = () => {
    const artistId = artist._id;
    const userId = user.userId;

    fetch(`${import.meta.env.VITE_API_URL}/api/users/add-artist-to-favourites/${userId}/${artistId}`, {
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error adding artist to favorites", error);
      });
  };

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="artist-details-container">
      <div className="artist-image-container">
        <img src={artist.image} alt={artist.name} className="artistImage" />
      </div>
      <div className="artist-details">
        <p className="artist-font">{artist.name}</p>
        <p>{artist.realName}</p>
        <p>{artist.location}</p>
        <button className="artist-favourites-button" onClick={handleAddToFavorites}>Add to Favorites</button>
      </div>
    </div>
  );
}

export default ArtistDetailsPage;
