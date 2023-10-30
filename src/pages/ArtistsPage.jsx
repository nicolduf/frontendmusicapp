import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ArtistsPage.css"

function ArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllArtists = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/artists`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const artistsData = await response.json();
      setArtists(artistsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching artist data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllArtists();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {artists.map((artist) => (
        <div key={artist.id} className="all-artists">
          <Link to={`/artists/${artist._id}`}>
            <h2 className="artist-name">{artist.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default ArtistsPage;
