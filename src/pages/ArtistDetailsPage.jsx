import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

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
    console.log(user)

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
    <>
      <img src={artist.image} alt={artist.name} className="artist" />
      <h1>{artist.name}</h1>
      <p>{artist.realName}</p>
      <p>{artist.location}</p>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </>
  );
}

export default ArtistDetailsPage;
