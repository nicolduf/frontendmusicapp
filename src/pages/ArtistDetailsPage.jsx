import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ArtistDetailsPage() {
  const { _id } = useParams();
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

  // const addToFavorites = () => {
  //   fetch(`${import.meta.env.VITE_API_URL}/favorites`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ artistId: artistId }),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error adding artist to favorites:", error);
  //     });
  // };

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <img src={artist.image} alt={artist.name} className="artist" />
      <h1>{artist.name}</h1>
      <p>{artist.realName}</p>
      <p>{artist.location}</p>
      {/* <button onClick={addToFavorites}>Add to Favorites</button> */}
    </>
  );
}

export default ArtistDetailsPage;
