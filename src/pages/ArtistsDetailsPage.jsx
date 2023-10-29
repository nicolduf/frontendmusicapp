import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ArtistDetailsPage() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const apiUrl = `${import.meta.env.VITE_API_URL}/artists/${artistId}`;
  const navigate = useNavigate();

  useEffect(() => {
    if (artistId) {
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
          console.error("Error fetching artist data");
        });
    }
  }, [artistId]);

  const addToFavorites = () => {
    fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ artistId: artistId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error adding artist to favorites");
      });
  };

  if (!artist) {
    return <div>Loading...</div>;
  }
}

export default ArtistDetailsPage;
