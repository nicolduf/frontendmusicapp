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
        throw new Error(`Network response was not ok (Status: ${response.status})`);
      }

      const songsData = await response.json();
      
      // Check if songsData has both songs and songOfTheDayTitle
      if ('songs' in songsData && 'songOfTheDayTitle' in songsData) {
        setSongs(songsData.songs);
        setOriginalSongs(songsData.songs);
        setIsLoading(false);
        setSongOfTheDayTitle(songsData.songOfTheDayTitle);
      } else {
        console.error("Invalid response format: Missing songs or songOfTheDayTitle");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("There's been an error fetching songs", error);
      setIsLoading(false);
    }
  };

  const fetchSongOfTheDayTitle = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`);

      if (!response.ok) {
        throw new Error(`Network response was not ok (Status: ${response.status})`);
      }

      const data = await response.json();
      console.log("Fetched Song of the Day Data:", data);

      const { title } = data;
      if (title) {
        console.log("Fetched Song of the Day Title:", title);
        setSongOfTheDayTitle(title);
      } else {
        console.error("Song of the Day title not found in the response");
      }
    } catch (error) {
      console.error("Error fetching Song of the Day:", error);
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
      const filteredSongs = originalSongs.filter((song) => song.genre === genre);
      setSongs(filteredSongs);
    }
  };

  useEffect(() => {
    fetchAllSongs();
    fetchSongOfTheDayTitle();
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
      <div className="centered-container">
        <button className="new-releases" onClick={sortSongsByNewestRelease}>New Releases</button>
        <button className="a-z" onClick={sortSongsAlphabetically}>A-Z</button>
        <select className="genres" onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          {allGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="image-grid-container">
        {songOfTheDayTitle && (
          <div key="song-of-the-day" className="song-of-the-day">
            <h2>Song of the Day</h2>
            <p>{songOfTheDayTitle}</p>
          </div>
        )}

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
