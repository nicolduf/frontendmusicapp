import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  const [songs, setSongs] = useState([]);
  const [originalSongs, setOriginalSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All"); // Initialize with "All" option

  const fetchAllSongs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const songsData = await response.json();
      setSongs(songsData);
      setOriginalSongs(songsData); // Save a copy of all songs
      setIsLoading(false);
    } catch (error) {
      console.error("There's been an error fetching songs", error);
      setIsLoading(false);
    }
  };

  const sortSongsByNewestRelease = () => {
    const sortedSongs = [...songs].sort(
      (a, b) => new Date(b.released) - new Date(a.released)
    );
    setSongs(sortedSongs);
  };

  const sortSongsAlphabetically = () => {
    const sortedSongs = [...songs].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    setSongs(sortedSongs);
  };

  // Function to filter songs by genre
  const filterSongsByGenre = (genre) => {
    if (genre === "All") {
      setSongs(originalSongs); // Restore all songs
    } else {
      const filteredSongs = originalSongs.filter((song) => song.genre === genre);
      setSongs(filteredSongs);
    }
  };

  // Update songs when the selected genre changes
  useEffect(() => {
    filterSongsByGenre(selectedGenre);
  }, [selectedGenre]);

  useEffect(() => {
    fetchAllSongs();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Create an array of unique genres from the songs
  const allGenres = ["All", ...new Set(songs.map((song) => song.genre))];

  return (
    <div>
      <div className="centered-container">
        <button onClick={sortSongsByNewestRelease}>New Releases</button>
        <button onClick={sortSongsAlphabetically}>A-Z</button>
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="image-grid-container">
        {songs.map((song) => (
          <div key={song.id}>
            <Link to={`/songs/${song._id}`}>
              <img src={song.image} alt={song.title} className="round-images" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
