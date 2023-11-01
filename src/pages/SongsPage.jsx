import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SongsPage.css";

function SongsPage() {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllSongs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const songsData = await response.json();
      setSongs(songsData);
      setIsLoading(false);
    } catch (error) {
      console.error("There's been an error fetching songs", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSongs();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="songs-grid-container">
        <Link to="/uploadSong">Upload Your Release</Link>
        {songs.map((song) => (
            <div key={song._id} className="all-songs">
                <Link to={`/songs/${song._id}`}>
                    <h2 className="song-title">{song.artist} - {song.title} /</h2>
                </Link>
            </div>
        ))}
    </div>
);
}

export default SongsPage;
