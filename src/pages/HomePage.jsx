import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  const [songs, setSongs] = useState([]);
  const [originalSongs, setOriginalSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [songOfTheDayTitle, setSongOfTheDayTitle] = useState(null);

  const fetchAllSongs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`);

      if (!response.ok) {
        throw new Error(
          `Network response was not ok (Status: ${response.status})`
        );
      }

      const songsData = await response.json();

      if ("songs" in songsData && "songOfTheDayTitle" in songsData) {
        setSongs(songsData.songs);
        setOriginalSongs(songsData.songs);
        setIsLoading(false);
        setSongOfTheDayTitle(songsData.songOfTheDayTitle); // Set Song of the Day title here
      } else {
        console.error(
          "Invalid response format: Missing songs or songOfTheDayTitle"
        );
        setIsLoading(false);
      }
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

  const filterSongsByGenre = (genre) => {
    if (genre === "All") {
      setSongs(originalSongs);
    } else {
      const filteredSongs = originalSongs.filter(
        (song) => song.genre === genre
      );
      setSongs(filteredSongs);
    }
  };

  useEffect(() => {
    fetchAllSongs();
  }, []);

  useEffect(() => {
    filterSongsByGenre(selectedGenre);
  }, [selectedGenre]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const allGenres = ["All", ...new Set(songs.map((song) => song.genre))];

  return (
    <div>
      {songOfTheDayTitle && (
        <div key="song-of-the-day" className="song-of-the-day">
          <p className="song-of-the-day-text">Song of the Day</p>
          <div className="animated-text-container">
            <p className="animated-text">{songOfTheDayTitle}</p>
          </div>
        </div>
      )}

      <div className="centered-container">
        <button className="new-releases" onClick={sortSongsByNewestRelease}>
          New Releases
        </button>
        <button className="a-z" onClick={sortSongsAlphabetically}>
          A-Z
        </button>
        <select
          className="genres"
          onChange={(e) => setSelectedGenre(e.target.value)}
          value={selectedGenre}
        >
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="image-grid-container">
        {songs.map((song, index) => (
          <div key={index}>
            <Link to={`/songs/${song._id}`}>
              <img src={song.image} alt={song.title} className="round-images" />
            </Link>
            {/* Additional details if needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
