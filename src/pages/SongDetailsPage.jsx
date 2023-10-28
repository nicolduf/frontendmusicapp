import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SongDetailsPage() {
  const { songId } = useParams();
  const [song, setSong] = useState(null);
  const apiUrl = `${import.meta.env.VITE_API_URL}/songs/${songId}`;
  const navigate = useNavigate();

  useEffect(() => {
    if (songId) {

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((songData) => {
          setSong(songData);
        })
        .catch((error) => {
          console.error("Error fetching song data");
        });
    }
  }, [songId]);

  if (!song) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <img src={song.image} alt={song.title} className="songImage" />
      <h1>{song.title}</h1>
      <h1>{song.artist}</h1>
      <p>{song.album}</p>
      <p>{song.genre}</p>
      <p>{song.label}</p>
      <p>{song.released}</p>
    </>
  );
}

export default SongDetailsPage;
