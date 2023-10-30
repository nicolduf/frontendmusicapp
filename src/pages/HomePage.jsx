import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/App.css";

function HomePage() {
    const [songs, setSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllSongs = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/songs`);
            console.log(response)

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
        return <div>Loading...</div>
    }

    return (
        <div>
            {songs.map((song) => (
                <div key={song.id} className="all-songs">
                    <img src={song.image} alt={song.title} />
                </div>
            ))}
        </div>
    );
}

export default HomePage;






