import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/ArtistDetails.css";

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
            throw new Error("Network response was not ok");
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

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/users/add-artist-to-favourites/${userId}/${artistId}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Optionally, you can update the local state to reflect the addition
        setArtist((prevArtist) => ({
          ...prevArtist,
          // Adjust your data structure as needed
          // For example, if you have a 'isFavorite' property, set it to true
          isFavorite: true,
        }));
      })
      .catch((error) => {
        console.error("Error adding artist to favorites", error);
      });
  };

  const handleRemoveFromFavorites = () => {
    const artistId = artist._id;
    const userId = user.userId;

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/users/remove-artist-from-favourites/${userId}/${artistId}`,
      {
        method: "DELETE", // Assuming you have an endpoint to handle removal using the DELETE method
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Optionally, you can update the local state to reflect the removal
        setArtist((prevArtist) => ({
          ...prevArtist,
          // Adjust your data structure as needed
          // For example, if you have a 'isFavorite' property, set it to false
          isFavorite: false,
        }));
      })
      .catch((error) => {
        console.error("Error removing artist from favorites", error);
      });
  };

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="artist-details-container">
      <div className="artist-details">
        <p className="artist">{artist.name}</p>
        <p className="artist-realName">{artist.realName}</p>
        <p className="artist-location">{artist.location}</p>
        <div>
          <button className="artist-favourites-button" onClick={handleAddToFavorites}>
            Add to Favorites
          </button>
          <button className="artist-remove-button" onClick={handleRemoveFromFavorites}>
            Remove from Favorites
          </button>
        </div>
      </div>
      <img src={artist.image} alt={artist.name} className="artist-image" />
    </div>
  );
}

export default ArtistDetailsPage;
